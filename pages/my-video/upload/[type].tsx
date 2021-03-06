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
                    msg: '????????? ????????? ?????????????????????.' 
                });
            }
        }else{
            setConfirm({
                show: true,
                msg: '????????? ????????? ????????? ?????????.'
            });
        }
    }

    const validateFile = async (file: File)=>{
        let msg = '';
        const SIZE = 100; // MB
        const TIME = 1;  // ???

        if(formatByte(file.size) >= SIZE){
            msg = `${SIZE}MB ?????????
            ???????????? ??? ????????????.`;
        }
        
        const duration = await getDuration(file);
        if(duration > TIME){
            msg = `????????? ${TIME}?????? ?????? ??? ????????????.
            ${TIME}??? ????????? ????????? ???????????????.`;
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
        let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        let isMatch = url.match(p) ? true : false;
        let isShorts = url.includes('youtube.com/shorts/'); 
        return isMatch || isShorts;
    }

    const onClickComplete = async ()=>{
        if(isEmbed){
            if(!validateEmbedLink(inputs.link)){
                setConfirm({
                    show: true,
                    msg: '????????? Youtube ?????? ????????? ????????????.' 
                });
                return;
            }
        }
        uploadVideo();
    }

    const uploadVideo = async ()=>{
        const resultMsg = isEdit ? '????????? ?????????????????????.' : '?????? ???????????? ?????????????????????.';
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
                msg: '???????????? ????????? ?????????????????????.',
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
                        fileName: '',   // ???????????? ????????? ????????? ?????? ????????????
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
            pushToast('????????? ????????? ?????????????????????.');
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
            title={`?????? ${isEdit ? '??????' : '?????????'}`} 
            headerTitle={`${isEmbed ? '?????????' : '??????'} ?????? ${isEdit ? '??????' : '?????????'}??????`}
            showBack={true}
            headerRight={<button className="theme-main" disabled={!inputs.isFinish} onClick={onClickComplete}>{isEdit ? '??????' : '??????'}</button>}
        >
            <form className="Upload" ref={formRef}>
                <Panel title="????????? ?????????">
                    <label className="label" htmlFor="thmbnailUpload">
                        <div className="thumbnail image-cover">
                            {preview ? 
                                <Image src={preview} alt="?????????" layout='fill'/> :
                                <div className="add">
                                    <Image src="/icon/common/btn_add.svg" alt="????????? ?????????" width={20} height={20}/>
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
                    <Panel title="????????? ??????">
                        <div className="box">
                            <input 
                                className="input"
                                placeholder="Youtube ????????? ??????????????????." 
                                name="link" 
                                value={inputs.link} 
                                onChange={onChange}
                            />
                            {/* <Image src='/icon/common/btn_link.svg' alt="????????????" width={44} height={44}/> */}
                        </div>
                    </Panel> :
                    <Panel title="?????? ?????????">
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
                                placeholder="????????? ????????? ????????????." 
                                disabled
                            />
                            <label htmlFor="videoUpload">
                                <Image src='/icon/common/btn_add2.svg' alt="?????? ?????????" width={44} height={44}/>
                            </label>
                        </div>
                    </Panel>
                }
                <Panel title="??????">
                    <input 
                        className="input"
                        value={inputs.title} 
                        name="title" 
                        onChange={onChange} 
                        placeholder="????????? ????????? ??????????????????."
                    />
                </Panel>
                <Panel title="??????">
                    <textarea 
                        className="desc" 
                        value={inputs.content} 
                        name="content" 
                        onChange={onChange} 
                        placeholder="????????? ?????? ?????????????????????."
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
                        background-color: var(--black);;
                        border: 0;
                        margin-right: 15px;
                        font-size: 20px;
                        color: var(--white);;
                        &::placeholder {
                            color: #8F8F8F;
                        }
                    }

                    .desc {
                        line-height: 140%;
                        font-size: 20px;
                        color: var(--white);;
                        background-color: var(--black);;
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
                    color: var(--white);;
                    margin-bottom: 12px;
                }
            `}</style>
        </section>
    );
}

export default Upload;