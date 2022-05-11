import {Video} from "libs/types";
import VideoCard from "components/VideoCard";

type VideoType = Pick<Video, 'videoId' | 'videoThumbnail' | 'videoTitle' | 'nickname'>

interface VideoItemProps {
    video: VideoType
    onButtonClick: (name: string, id: number)=> void
}

function VideoItem({video, onButtonClick}: VideoItemProps){
    const onClickButtons = (e: React.MouseEvent<HTMLDivElement>)=>{
        if(e.target instanceof HTMLButtonElement){
            const {name} = e.target;
            onButtonClick(name, video.videoId);
        }
    }

    return (
        <div className="Item">
            <VideoCard video={video}/>
            <div className="info">
                <h4 className="title">{video.videoTitle}</h4>
                <div className="name">{video.nickname}</div>
                <div className="buttons" onClick={onClickButtons}>
                    <button className="mod" name="mod">수정</button>
                    <button className="del" name="del">삭제</button>
                </div>
            </div>
            <style jsx>{`
                .Item {
                    position: relative;
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .buttons {
                    margin-top: 10px;
                    button {
                        margin: 0 3px;
                        padding: 5px 15px;
                        border-radius: 5px;
                        color: white;
                        font-weight: bold;
                        transition: .2s;
                        &.mod {
                            background-color: rgb(65, 65, 65);
                        }
                        &.del {
                            background-color: rgb(254, 86, 86);
                        }
                        &:hover {
                            box-shadow: 0 8px 15px -5px black;
                            transform: translateY(-2px);
                        }
                    }
                }
            `}</style>
        </div>
    );
}

export default VideoItem;