import AdminLayout from "components/Admin/AdminLayout";
import Button from "components/Admin/Button";
import ConfirmBox from "components/ConfirmBox";
import Grid, { GridColumn } from "components/Grid";
import Loading from "components/Loading";
import useToastMessage from "hooks/useToastMessage";
import { Video } from "libs/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import config from "utils/config";

let reqType: 'delete' | 'modify' | '' = '';

function ContentsDetail(){
    const {apiBaseURL} = config;
    const router = useRouter();
    const {id} = router.query;
    const {pushToast} = useToastMessage();
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<Video>();
    const [confirm, setConfirm] = useState({
        show: false,
        msg: '',
    });

    const getVideo = async ()=>{
        // 비디오 id로 fetch

        try{
            setLoading(true);

            // 테스트용
            setVideo({
                nickname: 'test',
                profile: 'test',
                videoId: 1,
                videoLike: 12,
                videoTitle: '비디오 제목!',
                videoThumbnail: '/test_link',
                videoContent: '내용 내용 내용 내용 내용 내용 ',
                videoCreationDate: '2022.05.05',
                videoViews: 339,
                directDir: 'vd_link',
            });

            // const res = await fetch(`${apiBaseURL}/admin/main/${id}`);
            // if(res.ok){
            //     const result = await res.json();    
            //     setVideo(result);
            // }else{
            //     throw new Error();
            // }
        }catch(ex){
            setConfirm({
                show: true,
                msg: '조회중 문제가 발생하였습니다.'
            });
            return [];
        }finally{
            setLoading(false);
        }
    }

    const modifyVideo = async ()=>{
        try{
            setLoading(true);
            const res = await fetch(`${apiBaseURL}/admin/main/modify/${id}`, {
                method: 'POST',
            });
            if(res.ok){
                pushToast('수정되었습니다!');
            }else{
                throw new Error();
            }
        }catch(ex){
            pushToast('처리중 문제가 발생하였습니다.');
        }finally{
            setLoading(false);
        }
    }
    
    const deleteVideo = async ()=>{
        try{
            setLoading(true);
            const res = await fetch(`${apiBaseURL}/admin/main/delete/${id}`, {
                method: 'POST',
            });
            if(res.ok){
                pushToast('영상이 삭제되었습니다.');
            }else{
                throw new Error();
            }
        }catch(ex){
            pushToast('처리중 문제가 발생하였습니다.');
        }finally{
            setLoading(false);
        }
    }

    const onClickButton = (e: React.MouseEvent)=>{
        if(e.target instanceof HTMLButtonElement){
            let msg = '';
            if(e.target.name === 'del'){
                msg = '영상을 삭제 하시겠습니까?';
                reqType = 'delete';
            }else{
                msg = '영상을 수정 하시겠습니까?';
                reqType = 'modify';
            }
            setConfirm({
                show: true,
                msg
            });
        }
    }
    
    const confirmCallback = (ok: boolean)=>{
        if(ok){
            if(reqType === 'delete'){
                deleteVideo();
            }else if(reqType === 'modify'){
                modifyVideo();
            }   
        }
        setConfirm({show: false, msg: ''});
    }

    useEffect(()=>{
        getVideo();
    }, []);

    return (
        <AdminLayout path={['콘텐츠', '상세 정보']}>
            <div className="ContentsDetail">
                <section className="preview">
                    <div className="img">
                        <Image src={'/icon/common/empty_img.svg'} alt="empty" layout="fill"/>
                    </div>
                    <div className="intro">
                        <div className="row">
                            <h2>영상 제목</h2>
                            <p>{video?.videoTitle}</p>
                        </div>
                        <div className="row">
                            <h2>영상 설명</h2>
                            <p>{video?.videoContent}</p>
                        </div>
                    </div>
                </section>
                <section onClick={onClickButton}>
                    <Button text="수정하기" style={{marginRight: '10px'}} name="mod"/>
                    <Button text="삭제하기" name="del" type="red"/>
                </section>
                <section className="info">
                    <div className="field">Video ID</div>
                    <div>{video?.videoId}</div>
                    <div className="field">Type</div>
                    <div>{video?.embedLink ? 'Embed' : 'Self'}</div>
                    <div className="field">User Nickname</div>
                    <div>{video?.nickname}</div>
                    <div className="field">Thumbnail</div>
                    <div>{video?.videoThumbnail}</div>
                    <div className="field">Video Url</div>
                    <div>{video?.embedLink || video?.directDir}</div>
                </section>
                <ConfirmBox show={confirm.show} message={confirm.msg} callback={confirmCallback}/>
                <Loading show={loading}/>
                <style jsx>{`
                    .ContentsDetail {
                        padding: 20px;
                    }

                    .img {
                        position: relative;
                        width: 300px;
                        height: 300px;
                    }

                    .preview {
                        display: flex;
                        margin-bottom: 80px;
                    }

                    .intro {
                        margin-left: 50px;
                        h2 {
                            font-size: 20px;
                        }
                        .row {
                            &:not(:last-child) {
                                margin-bottom: 30px;
                            }
                        }
                    }

                    .info {
                        display: grid;
                        grid-template-columns: 150px 1fr;
                        margin-top: 5px;
                        box-shadow: 0 5px 20px -10px black;
                        border-radius: 6px;
                        max-width: 900px;
                        overflow: hidden;
                        > div {
                            display: flex;
                            align-items: center;
                            padding-left: 10px;
                            height: 50px;
                            background-color:rgb(231, 231, 231);
                            border-bottom: 1px solid white;
                            &:last-child, &:nth-last-child(2) {
                                border-bottom: 0;
                            }
                            &.field {
                                background-color: rgb(192, 192, 192);
                                font-weight: bold;
                            }
                        }
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default ContentsDetail;