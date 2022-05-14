import AdminLayout from "components/Admin/AdminLayout";
import ConfirmBox from "components/ConfirmBox";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import {Video} from "libs/types";
import VideoItem from "components/Admin/VideoItem";
import { useRouter } from "next/router";
import config from "utils/config";

type VideoType = Pick<Video, 'videoId' | 'videoThumbnail' | 'videoTitle' | 'nickname'>

function Contents(){
    const {apiBaseURL} = config;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState({show: false, msg: ''});
    const [videos, setVideo] = useState<VideoType[]>([]);

    const getVideos = async ()=>{
        try{
            setLoading(true);

            // 테스트용
            setVideo([
                {videoId: 1, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 1', nickname: 'user_1'},
                {videoId: 2, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 2', nickname: 'user_2'},
                {videoId: 3, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 3', nickname: 'user_3'},
                {videoId: 4, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 4', nickname: 'user_4'},
                {videoId: 5, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 5', nickname: 'user_5'},
                {videoId: 6, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 6', nickname: 'user_6'},
                {videoId: 7, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 7', nickname: 'user_7'},
                {videoId: 8, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 8', nickname: 'user_8'},
                {videoId: 9, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 9', nickname: 'user_9'},
                {videoId: 10, videoThumbnail: '/icon/common/empty_img.svg', videoTitle: '비디오 제목 10', nickname: 'user_10'},
            ]);

            // const res = await fetch(`${apiBaseURL}/admin/main`);
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

    const onItemClick = (name: string, id: number)=>{
        if(name === 'del'){
            alert('삭제 ' + id);
        }else{
            router.push(`${router.pathname}/${id}`);
        }
    }

    useEffect(()=>{
        getVideos();
    }, []);

    return (
        <AdminLayout path={['콘텐츠']}>
            <div className="Contents">
                <div className="items">
                    {videos.map(vd => (
                        <VideoItem key={vd.videoId} video={vd} onButtonClick={onItemClick}/>
                    ))}
                </div>
                <Loading show={loading}/>
                <ConfirmBox 
                    show={confirm.show} 
                    message={confirm.msg} 
                    callback={()=> {setConfirm({show: false, msg: ''})}} 
                    isAlert
                />
                <style jsx>{`
                    .Contents {
                        padding: 20px;
                    }

                    .items {
                        display: grid;
                        grid-template-columns: repeat(5, 128px);
                        gap: 30px 20px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default Contents;