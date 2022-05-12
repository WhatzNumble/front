import Layout from "components/Layout";
import VideoCard from "components/VideoCard";
import useToastMessage from "hooks/useToastMessage";
import { VideoBasic } from "libs/types";
import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useEffect } from "react";
import config from "utils/config";

interface Props {
    videos: VideoBasic[]
    errorMsg: string
}

function Like({videos, errorMsg}: Props){
    const {pushToast} = useToastMessage();

    useEffect(()=>{
        if(errorMsg){
            pushToast(errorMsg);
        }
    }, []);

    return (
        <Layout title="좋아요">
            <div className="Like">
                {videos.length ? 
                    <div className="cards">
                        {videos.map(vd => (
                            <VideoCard key={vd.videoId} video={vd}/>
                        ))}
                    </div> :
                    <div className="empty-txt">조회된 영상이 없습니다.</div>
                }
                <style jsx>{`
                    .Like {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        padding-top: 20px;
                    }

                    .cards {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 4px;
                        padding: 0 16px 0 16px;
                    }

                    .empty-txt {
                        position: absolute;
                        top: 50%;;
                        left: 50%;;
                        transform: translate(-50%, -50%);
                        color: #B8B8B8;
                    }
                `}</style>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
    const {apiBaseURL} = config;
    const allCookies = cookies(ctx);
    let result;
    let errorMsg = '';
    try{
        const token = allCookies['access-token'] || '';
        if(!token){
            throw new Error();
        }

        const res = await fetch(`${apiBaseURL}/api/like`, {
            headers: {
                'x-auth-token': token
            }
        });

        if(res.ok){
            result = await res.json();
        }else{
            throw new Error();
        }
    }catch(ex){
        errorMsg = '조회중 문제가 발생하였습니다.';
        result = {
            videos: []
        };
    }

    return {
        props: {
            errorMsg,
            videos: result.videos,
            // videos: [
            //     {videoId: 1, videoThumbnail: 'test 1'},
            //     {videoId: 2, videoThumbnail: 'test 2'},
            //     {videoId: 3, videoThumbnail: 'test 3'},
            //     {videoId: 4, videoThumbnail: 'test 4'},
            //     {videoId: 5, videoThumbnail: 'test 5'},
            //     {videoId: 6, videoThumbnail: 'test 6'},
            //     {videoId: 7, videoThumbnail: 'test 7'},
            //     {videoId: 8, videoThumbnail: 'test 8'},
            //     {videoId: 9, videoThumbnail: 'test 9'},
            //     {videoId: 10, videoThumbnail: 'test 10'},
            //     {videoId: 11, videoThumbnail: 'test 11'},
            // ],
        }
    }
}

export default Like;