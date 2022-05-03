import Layout, { TAB_HEIGHT } from "components/Layout";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Video, VideoList} from 'libs/types';
import VideoCard from "components/VideoCard";
import PopBox from "components/PopBox";

interface Props {
    videos: Video[]
}

function MyVideo({videos}: Props){
    const [showUpload, setShowUploads] = useState(false);
    const router = useRouter();

    const onClickUpload = ()=>{
        setShowUploads(true);
    }

    const onClickClose = ()=>{
        setShowUploads(false);
    }

    return (
        <Layout title="마이 비디오">
            <div className="MyVideo">
                {videos.length ? 
                    <div className="video-box">
                        <div className="button-upload">
                            <button className="theme-main" onClick={onClickUpload}>영상 업로드 하기</button>
                        </div>
                        <div className="cards">
                            {videos.map(vd => (
                                <VideoCard key={vd.videoId} video={vd}/>
                            ))}
                        </div>
                        <PopBox show={showUpload} onClosePopBox={onClickClose}>
                            <div className="up">
                                <h2 className="text">영상 업로드 하기</h2>
                                <UploadLink 
                                    self={<button className="button-self">직접 영상 업로드 하기</button>}
                                    embed={<button className="button-embed">임베드 영상 업로드 하기</button>}
                                />
                            </div>
                        </PopBox>
                    </div> :
                    <div className="empty-box">
                        <Image src='/empty_img.png' alt="Empty" width={120} height={120}/>
                        <h2 className="text gray">업로드된 영상이 없습니다.</h2>
                        <div className="buttons">
                            <UploadLink 
                                self={<button className="theme-main">직접 영상 업로드 하기</button>}
                                embed={<button className="embed">임베드 영상 업로드 하기</button>}
                            />
                        </div>
                    </div> 
                }
                <style jsx>{`
                    $dark: #2C2C2C;

                    .MyVideo {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                    }

                    .video-box {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .cards {
                        flex-grow: 1;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(auto-fill, 198px);
                        gap: 4px;
                        padding: 0 16px;
                        box-shadow: inset 0 0 0 1px blue;
                    }

                    .gray {
                        color: #B8B8B8;
                        font-weight: normal;
                    }

                    .up {
                        .text {
                            color: $dark;
                            font-size: 14px;
                            margin-bottom: 10px;
                        }
                        button {
                            font-weight: bold;
                            font-size: 18px;
                            background-color: white;
                            color: $dark;
                        }
                        button[class*='button-'] {
                            padding: 8px 0;
                            text-align: left;
                            width: 100%;
                        }
                    }

                    .button-upload {
                        display: flex;
                        justify-content: center;
                        padding: 15px 0 20px 0;
                        button {
                            padding: 10px 20px;
                        }
                    }

                    .empty-box {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        .text {
                            font-size: 14px;
                            margin: 18px 0 50px 0;
                        }
                    }

                    .buttons {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        button {
                            width: 280px;
                            height: 48px;
                            font-size: 16px;
                            border-radius: 50px;
                            margin: 4px 0;
                            &.embed {
                                color: white;
                                background-color: black;
                                border: 1px solid #8F8F8F;
                            }
                        }
                    }
                `}</style>
            </div>
        </Layout>
    );
}

function UploadLink({self, embed}: {self: React.ReactNode, embed: React.ReactNode}){
    const router = useRouter();
    return <>
        <Link href={`${router.pathname}/upload/self`}>
            <a>
                {self}
            </a>
        </Link>
        <Link href={`${router.pathname}/upload/embed`}>
            <a>
                {embed}
            </a>
        </Link>
    </>;
}

export const getServerSideProps: GetServerSideProps = async ()=>{
    const res = await fetch('http://52.78.135.138:8080/api/video');
    const list = await res.json();

    return {
        props: {
            videos: list.videos,
            // videos: [
            //     {id: 1, name: 'test 1'},
            //     {id: 2, name: 'test 2'},
            //     {id: 3, name: 'test 3'},
            //     {id: 4, name: 'test 4'},
            //     {id: 5, name: 'test 5'},
            //     {id: 6, name: 'test 6'},
            //     {id: 7, name: 'test 7'},
            //     {id: 8, name: 'test 8'},
            //     {id: 9, name: 'test 9'},
            //     {id: 10, name: 'test 10'},
            //     {id: 11, name: 'test 11'},
            // ],
        }
    }
}

export default MyVideo;