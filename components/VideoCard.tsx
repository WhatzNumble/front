import {Video, VideoBasic} from 'libs/types';
import Image from 'next/image';

interface Props {
    video: VideoBasic
    onCardClick?: (id: number)=> void
}

function VideoCard({video, onCardClick}: Props){
    const onClick = ()=>{
        if(onCardClick) onCardClick(video.videoId);
    }

    return (
        <div className='VideoCard' onClick={onClick}>
            {video.videoId}
            <Image className='thumbnail' src='/icon/common/empty_img.svg'  alt='empty_image' layout='fill'/>
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
                    transition: .2s;
                    &:hover {
                        transform: scale(1.15);
                    }
                }
            `}</style>
        </div>
    );
}

export default VideoCard;