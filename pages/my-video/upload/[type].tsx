import ConfirmBox from "components/ConfirmBox";
import Layout from "components/Layout";
import Loading from "components/Loading";
import useToastMessage from "hooks/useToastMessage";
import useUserState from "hooks/useUserState";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import config from "utils/config";

function Upload(){
    const {apiBaseURL} = config;
    const user = useUserState();
    const {pushToast} = useToastMessage();    
    const router = useRouter();
    const {type, edit, videoId} = router.query;
    const isEmbed = type === 'embed';
    const isEdit = edit === 'true';
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');
    const [confirm, setConfirm] = useState({
        show: false,
        msg: '',
    });
    const [inputs, setInputs] = useState({
        link: '',
        title: '',
        content: '', 
        fileName: '',
        videoThumbnail: '',
        thumbnailName: '',
        isFinish: false,
    }); 

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.currentTarget;

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>)=>{
        const targ = e.currentTarget;
        const {name, files} = targ;

        if(files && files.length === 1){
            const fileName = files[0].name;
            try{
                switch(name){
                    case 'videoThumbnail':
                        const fileContent = await fileLoader(files[0]);
                        setPreview(fileContent as string);
                        setInputs({
                            ...inputs,
                            thumbnailName: fileName
                        });
                        break;
                    case 'file':
                        if(!validateFile(files[0])) return;
                        setInputs({
                            ...inputs,
                            fileName
                        });
                        break;
                }
            }catch(ex){
                setConfirm({
                    show: true,
                    msg: '작업중 문제가 발생하였습니다.' 
                });
            }
        }else{
            setConfirm({
                show: true,
                msg: '파일을 하나만 선택해 주세요.'
            });
        }
    }

    const validateFile = async (file: File)=>{
        let msg = '';
        const SIZE = 100; // MB
        const TIME = 1;  // 분

        if(formatByte(file.size) >= SIZE){
            msg = `${SIZE}MB 이상은
            업로드할 수 없습니다.`;
        }
        
        const duration = await getDuration(file);
        if(duration > TIME){
            msg = `영상은 ${TIME}분을 넘을 수 없습니다.
            ${TIME}분 이하의 영상만 올려주세요.`;
        }
        
        if(msg){
            setConfirm({
                show: true,
                msg,
            });
            return false;
        }
        return true;
    }

    const getDuration = (file: File)=>{
        return new Promise<number>((res, rej)=>{
            const reader = new FileReader();
            reader.onload = ()=> {
                const media = new Audio(reader.result as string);
                media.onloadedmetadata = ()=> res(media.duration / 60);
            };
            reader.readAsDataURL(file);
        });
    };

    const fileLoader = (file: File)=>{
        return new Promise(res => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            reader.onload = ()=> {
                res(reader.result);
            };
        });
    }

    const validateEmbedLink = (url: string)=>{
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return url.match(p) ? true : false;
    }

    const onClickComplete = async ()=>{
        if(isEmbed){
            if(!validateEmbedLink(inputs.link)){
                setConfirm({
                    show: true,
                    msg: '올바른 Youtube 영상 링크가 아닙니다.' 
                });
                return;
            }
        }
        uploadVideo();
    }

    const uploadVideo = async ()=>{
        const resultMsg = isEdit ? '영상이 수정되었습니다.' : '영상 업로드가 완료되었습니다.';
        const api = `${apiBaseURL}/video/${isEdit ? 'modify' : 'add'}/${isEmbed ? 'embed': 'direct'}`; 
        try{
            setLoading(true);
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    [`${config.authHeaderKey}`]: user.token
                },
                body: new FormData(formRef.current!),
            });
            if(res.ok){
                pushToast(resultMsg);
                router.push('/my-video');
            }else{
                throw new Error();
            }
        }catch(ex){
            setConfirm({
                show: true,
                msg: '업로드중 문제가 발생하였습니다.',
            });
        }finally{
            setLoading(false);
        }
    }

    const onConfirmCallback = ()=>{
        setConfirm({
            ...confirm,
            show: false
        });
    }

    const formatByte = (byte: number)=>{
        const mb = 1024 * 1024;
        return Number((byte / mb).toFixed(3));
    }

    const strInvalid = (str: string)=> !str || !str.trim();

    const validateInputs = ()=>{
        let valid = true;
        const {title, content, fileName, link} = inputs;

        if(strInvalid(preview) || strInvalid(title) || strInvalid(content)){
            valid = false;
        }
        
        if(isEmbed){
            if(strInvalid(link)){
                valid = false;
            }
        }else{
            if(strInvalid(fileName)){
                valid = false;
            }
        }
        return valid;
    }

    const getVideo = async (id: number)=>{
        try{
            setLoading(true);
            const res = await fetch(`${apiBaseURL}/video/${id}`, {
                headers: {
                    [`${config.authHeaderKey}`]: user.token
                },
            });
            if(res.ok){
                const result = await res.json();
                if(result){
                    setInputs({
                        link: result.embedLink,
                        title: result.videoTitle,
                        content: result.videoContent, 
                        fileName: '',   // 직접영상 수정은 새로운 파일 올려야함
                        videoThumbnail: result.video,
                        thumbnailName: result.video,
                        isFinish: false,
                    });
                }else{
                    throw new Error();
                }
            }else{
                throw new Error();
            }
        }catch(ex){
            pushToast('조회중 문제가 발생하였습니다.');
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(isEdit && videoId){
            getVideo(Number(videoId));
        }
    }, []);

    useEffect(()=>{
        setInputs({
            ...inputs,
            isFinish: validateInputs()
        });
    }, [inputs.title, inputs.content, inputs.fileName, inputs.link, preview]);

    return (
        <Layout 
            title={`영상 ${isEdit ? '수정' : '업로드'}`} 
            headerTitle={`${isEmbed ? '임베드' : '직접'} 영상 ${isEdit ? '수정' : '업로드'}하기`}
            showBack={true}
            headerRight={<button className="theme-main" disabled={!inputs.isFinish} onClick={onClickComplete}>{isEdit ? '수정' : '완료'}</button>}
        >
            <form className="Upload" ref={formRef}>
                <Panel title="썸네일 업로드">
                    <label className="label" htmlFor="thmbnailUpload">
                        <div className="thumbnail image-cover">
                            {preview ? 
                                <Image src={preview} alt="썸네일" layout='fill'/> :
                                <div className="add">
                                    <Image src="/icon/common/btn_add.svg" alt="썸네일 업로드" width={20} height={20}/>
                                </div>
                            }
                        </div>
                    </label>
                    <input 
                        id="thmbnailUpload" 
                        type="file" 
                        name="videoThumbnail" 
                        onChange={onFileChange} 
                        accept="image/*" 
                        hidden={true}
                    />
                    <input 
                        className="input"
                        name="thumbnailName"
                        value={inputs.thumbnailName} 
                        type="hidden"
                    />
                </Panel>
                {isEmbed ? 
                    <Panel title="임베드 링크">
                        <div className="box">
                            <input 
                                className="input"
                                placeholder="Youtube 링크를 입력해주세요." 
                                name="link" 
                                value={inputs.link} 
                                onChange={onChange}
                            />
                            {/* <Image src='/icon/common/btn_link.svg' alt="링크추가" width={44} height={44}/> */}
                        </div>
                    </Panel> :
                    <Panel title="영상 업로드">
                        <div className="box">
                            <input 
                                id="videoUpload" 
                                type="file" 
                                name="file" 
                                onChange={onFileChange} 
                                accept="video/*"
                                hidden={true}
                            />
                            <input 
                                className="input"
                                value={inputs.fileName} 
                                placeholder="영상을 업로드 해주세요." 
                                disabled
                            />
                            <label htmlFor="videoUpload">
                                <Image src='/icon/common/btn_add2.svg' alt="영상 업로드" width={44} height={44}/>
                            </label>
                        </div>
                    </Panel>
                }
                <Panel title="제목">
                    <input 
                        className="input"
                        value={inputs.title} 
                        name="title" 
                        onChange={onChange} 
                        placeholder="영상의 제목을 입력해주세요."
                    />
                </Panel>
                <Panel title="설명">
                    <textarea 
                        className="desc" 
                        value={inputs.content} 
                        name="content" 
                        onChange={onChange} 
                        placeholder="영상에 대해 이야기해주세요."
                    />
                </Panel>

                <Loading show={loading}/>
                <ConfirmBox show={confirm.show} message={confirm.msg} callback={onConfirmCallback} isAlert/>

                <style jsx>{`
                    $gray: #e7e7e7;

                    .Upload {
                        height: 100%;
                        padding: 16px 16px 0 16px;
                        overflow: auto;
                    }

                    .label {
                        width: fit-content;
                        border-radius: 8px;
                    }

                    .thumbnail {
                        position: relative;
                        width: 128px;
                        height: 228px;
                        border-radius: 8px;
                        background-color: #2C2C2C;
                        cursor: pointer;
                        overflow: hidden;
                        .add {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .box {
                        display: flex;
                        align-items: center;
                    }

                    .input {
                        height: 28px;
                        flex-grow: 1;
                        background-color: black;
                        border: 0;
                        margin-right: 15px;
                        font-size: 20px;
                        color: white;
                        &::placeholder {
                            color: #8F8F8F;
                        }
                    }

                    .desc {
                        line-height: 140%;
                        font-size: 20px;
                        color: white;
                        background-color: black;
                        height: 200px;
                        border: 0;
                        &::placeholder {
                            color: #8F8F8F;
                        }
                    }
                `}</style>
            </form>
        </Layout>
    );
}

function Panel({children, title}: {children: React.ReactNode, title: string}){
    return (
        <section className="Panel">
            <h2 className="title">{title}</h2>
            {children}
            <style jsx>{`
                .Panel {
                    display: flex;
                    flex-direction: column;
                    &:not(:last-child) {
                        margin-bottom: 40px;
                    }
                }

                .title {
                    font-size: 16px;
                    font-weight: normal;
                    color: white;
                    margin-bottom: 12px;
                }
            `}</style>
        </section>
    );
}

export default Upload;