import {IFVideo} from 'libs/types';

interface Props {
    video: IFVideo
}

function VideoCard({video}: Props){
    return (
        <div className="VideoCard">
            {video.id}
            <style jsx>{`
                .VideoCard {
                    border-radius: 8px;
                    background-color: #C4C4C4;
                }
            `}</style>
        </div>
    );
}

export default VideoCard;