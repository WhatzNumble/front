import {Video} from 'libs/types';
import Image from 'next/image';

interface Props {
    video: Video
}

function VideoCard({video}: Props){
    debugger;
    return (
        <div className="VideoCard">
            <Image className="thumbnail" src="/empty_img.svg"  alt='empty_image'layout="fill"/>
            {video.videoId}
            <style jsx>{`
                .VideoCard {
                    position: relative;
                    border-radius: 8px;
                    background-color: #C4C4C4;
                    height: 198px;
                    max-height: 198px;
                }
            `}</style>
            <style jsx global>{`
                img.thumbnail {
                    object-fit: contain;
                }
            `}</style>
        </div>
    );
}

export default VideoCard;