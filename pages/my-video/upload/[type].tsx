import ConfirmBox from "components/ConfirmBox";
import Layout from "components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {uiActions} from 'store/ui';

function Upload(){
    const dispatch = useDispatch();
    const router = useRouter();
    const {type} = router.query;
    const isEmbed = type === 'embed';
    const [confirm, setConfirm] = useState({
        show: false,
        msg: '',
    });
    const [inputs, setInputs] = useState({
        embedLink: '',
        title: '',
        description: '', 
        selfVideoName: '',
        thumbnailImage: '',
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
            try{
                const fileContent = await fileLoader(files[0]);
                console.log(fileContent);
                if(name === 'thumbnail'){

                }else{
        
                }
            }catch(ex){
                dispatch(uiActions.pushToast({message: '업로드중 문제가 발생하였습니다.'}));
            }
        }else{
            setConfirm({
                show: true,
                msg: '파일을 하나만 선택해 주세요.'
            });
            setInputs({
                ...inputs,

            });
        }

        // todo - 영상 업로드 api 처리 

    }

    const fileLoader = (file: File)=>{
        return new Promise(res => {
            const reader = new FileReader();
            reader.readAsText(file);
    
            reader.onload = ()=> {
                res(reader.result);
            };
        });
    }
    
    const onClickComplete = ()=>{
        dispatch(uiActions.pushToast({message: '영상 업로드가 완료되었습니다.'}));
        router.push('/my-video');
    }

    const onConfirmCallback = ()=>{
        setConfirm({
            ...confirm,
            show: false
        });
    }

    return (
        <Layout 
            title="영상 업로드" 
            headerTitle={`${isEmbed ? '임베드' : '직접'} 영상 업로드하기`}
            showBack={true}
            headerRight={<button className="theme-main" disabled={!inputs.isFinish} onClick={onClickComplete}>완료</button>}
        >
            <div className="Upload">
                <Panel title="썸네일 업로드">
                    <label className="label" htmlFor="fileUpload">
                        <div className="thumbnail">
                            <div className="add">
                                <Image src='/btn_add.svg' width={20} height={20}/>
                            </div>
                        </div>
                    </label>
                    <input id="fileUpload" type="file" name="thumbnail" value={inputs.thumbnailImage} onChange={onFileChange} hidden={true}></input>
                </Panel>
                {isEmbed ? 
                    <Panel title="연결 링크">
                        <div className="box">
                            <input placeholder="링크추가" name="embedLink" value={inputs.embedLink} onChange={onChange}></input>
                            <Image src='/btn_link.svg' width={44} height={44}/>
                        </div>
                    </Panel> :
                    <Panel title="영상 업로드">
                        <div className="box">
                            <input id="videoUpload" type="file" name="self" onChange={onFileChange} hidden={true}></input>
                            <input placeholder="영상을 업로드 해주세요" value={inputs.selfVideoName} disabled></input>
                            <label htmlFor="videoUpload">
                                <Image src='/btn_add2.svg' width={44} height={44}/>
                            </label>
                        </div>
                    </Panel>
                }
                <Panel title="설명">
                    <textarea className="desc" value={inputs.description} name="description" onChange={onChange} placeholder="영상에 대해 이야기해주세요"></textarea>
                </Panel>

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
                    }

                    .thumbnail {
                        position: relative;
                        width: 128px;
                        height: 228px;
                        border-radius: 8px;
                        background-color: #2C2C2C;
                        cursor: pointer;
                        .add {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .box {
                        display: flex;
                        input {
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
            </div>
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