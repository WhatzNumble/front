import Layout from "components/Layout";
import ShortFormPlayer from "components/ShortFormPlayer";
import mockVideos from "components/ShortFormPlayer/mockVideos";
import VideoCard from "components/VideoCard";
import useToastMessage from "hooks/useToastMessage";
import { Video } from "libs/types";
import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "utils/config";

interface Props {
    videos: Video[]
    errorMsg: string
}

function Like({videos, errorMsg}: Props){
    const router = useRouter();
    const {pushToast} = useToastMessage();

    const onCardClick = (id: number)=>{
        const clone = videos.map(vd => ({...vd}));
        const selectedIndex = clone.findIndex(vd => id === vd.videoId);
        const extract = clone.splice(selectedIndex, 1);
        if(extract.length){
            clone.unshift(extract[0]);
        }
        router.push({
            pathname: `${router.pathname}/play`,
            query: {
                playList: JSON.stringify(clone)
            }
        }, `${router.pathname}/play`);
    }

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
                            <VideoCard 
                                key={vd.videoId} 
                                video={vd} 
                                onCardClick={onCardClick}
                            />
                        ))}
                    </div> :
                    <div className="empty-box">
                        <Image src='/icon/common/bookmark.svg' width={40} height={40} alt ='no videos'/>
                        <h3 className="text">조회된 영상이 없습니다.</h3>
                    </div>
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
                        gap: 8px;
                        padding: 0 16px 0 16px;
                    }

                    .empty-box {
                        position: absolute;
                        top: 40%;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #B8B8B8;
                        .text {
                            font-size: 15px;
                            font-weight: normal;
                            margin-top: 20px;
                        }
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
            // videos: result.videos,
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
            videos: mockVideos
        }
    }
}

export default Like;