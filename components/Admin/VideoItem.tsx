import {Video} from "libs/types";
import VideoCard from "components/VideoCard";
import Button from "./Button";

type VideoType = Pick<Video, 'videoId' | 'videoThumbnail' | 'videoTitle' | 'nickname'>

interface VideoItemProps {
    video: VideoType
    onButtonClick: (name: string, id: number)=> void
}

function VideoItem({video, onButtonClick}: VideoItemProps){
    const buttonStyle = {
        width: '50px',
        margin: '0 2px',
    }

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
                    <Button name="mod" style={buttonStyle} text="수정"/>
                    <Button name="del" style={buttonStyle} text="삭제" type="red"/>
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

                .title {
                    margin: 5px 0 0 0;
                }

                .name {
                    margin-bottom: 10px;
                }

                .buttons {
                    display: flex;
                }
            `}</style>
        </div>
    );
}

export default VideoItem;