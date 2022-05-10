import Layout from "components/Layout";
import VideoCard from "components/VideoCard";
import { VideoBasic } from "libs/types";
import { GetServerSideProps } from "next";

interface Props {
    videos: VideoBasic[]
}

function Like({videos}: Props){
    return (
        <Layout title="좋아요">
            <div className="Like">
                <div className="cards">
                    {videos.map(vd => (
                        <VideoCard key={vd.videoId} video={vd}/>
                    ))}
                </div>

                <style jsx>{`
                    .Like {
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
                `}</style>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ()=>{
    return {
        props: {
            videos: [
                {videoId: 1, videoThumbnail: 'test 1'},
                {videoId: 2, videoThumbnail: 'test 2'},
                {videoId: 3, videoThumbnail: 'test 3'},
                {videoId: 4, videoThumbnail: 'test 4'},
                {videoId: 5, videoThumbnail: 'test 5'},
                {videoId: 6, videoThumbnail: 'test 6'},
                {videoId: 7, videoThumbnail: 'test 7'},
                {videoId: 8, videoThumbnail: 'test 8'},
                {videoId: 9, videoThumbnail: 'test 9'},
                {videoId: 10, videoThumbnail: 'test 10'},
                {videoId: 11, videoThumbnail: 'test 11'},
            ],
        }
    }
}

export default Like;