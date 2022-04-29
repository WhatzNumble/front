import Layout from "components/Layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {uiActions} from 'store/ui';

function Upload(){
    const dispatch = useDispatch();
    const router = useRouter();
    const {type} = router.query;
    const isEmbed = type === 'embed';
    const [inputs, setInputs] = useState({
        embedLink: '',
        title: '',
        description: '', 
    }); 

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = e.currentTarget;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onClickUpload = ()=>{
        // 영상 업로드 처리 로직... 

        dispatch(uiActions.pushToast({message: '영상 업로드가 완료되었습니다.'}));

        router.push('/my-video');
    }

    return (
        <Layout 
            title="영상 업로드" 
            headerTitle={`${isEmbed ? '임베드' : '직접'} 영상 업로드`}
            headerLeft={<button onClick={()=> router.back()}>취소</button>}
            headerRight={<button disabled>완료</button>}
        >
            <div className="Upload">
                {isEmbed ? 
                    <section>
                        <h2 className="title">영상 임베드 링크</h2>
                        <div className="link-box">
                            <input value={inputs.embedLink} name="embedLink" onChange={onChange}/>
                            <a href={inputs.embedLink} target="_blank">
                                <div className="link">링크</div>
                            </a>
                        </div>
                    </section> :
                    <section>
                        <h2 className="title">영상 업로드</h2>
                        <label htmlFor='upload-video'>
                            <div className='upload-box'></div>
                        </label>
                        <input id='upload-video' type='file' hidden={true}></input>
                    </section>
                }
                <section>
                    <h2 className="title">썸네일 이미지</h2>
                    <label htmlFor='upload-thumbnail'>
                        <div className='upload-box'></div>
                    </label>
                    <input id='upload-thumbnail' type='file' hidden={true}></input>
                </section>

                <section>
                    <h2 className="title">제목</h2>
                    <input className="input-title" value={inputs.title} name="title" onChange={onChange}/>
                </section>

                <section>
                    <h2 className="title">설명</h2>
                    <textarea className="input-desc" value={inputs.description} name="description" onChange={onChange}/>
                </section>

                <button className="upload-button" onClick={onClickUpload}>영상 업로드하기</button>
            </div>
            <style jsx>{`
                $gray: #e7e7e7;

                .Upload {
                    position: relative;
                    height: 100%;
                    margin: 0 10px;
                }

                .title {
                    font-size: 13px;
                    margin: 20px 0 5px 0;
                }

                .link-box {
                    display: flex;
                    justify-content: stretch;
                    height: 42px;
                    input {
                        flex-grow: 1;
                        margin-right: 5px;
                    }
                }

                .upload-box {
                    width: 150px;
                    height: 80px;
                    background-color: $gray;
                }

                .link {
                    width: 42px;
                    height: 100%;
                    font-size: 12px;
                    line-height: 40px;
                    text-align: center;
                    background-color: $gray;
                }

                input, textarea {
                    background-color: $gray;
                }

                .input-title {
                    width: 100%;
                    height: 30px;
                }

                .input-desc {
                    width: 100%;
                    height: 130px;
                }
                
                .upload-button {
                    position: absolute;
                    width: 100%;
                    height: 40px;
                    bottom: 0;
                    border-radius: 6px;
                    background-color: black;
                    color: white;
                }
            `}</style>
        </Layout>
    );
}

export default Upload;