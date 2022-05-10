import { useState } from 'react';
import { Video } from 'libs/types';
import Player from './Player';

interface Props {
  query?: string;
  preLoadedVideos: Video[];
}

const ShortFormPlayer: React.FC<Props> = ({ query, preLoadedVideos }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  return;
  <>
    <div className='VideosContainer'>
      {videos?.map((video, index) => {
        return <Player key={index} video={video} />;
      })}
    </div>
    <style jsx>
      {`
        .VideosContainer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: scroll;
          scroll-snap-type: y mandatory;
          background-color: #000;
        }
      `}
    </style>
  </>;
};

export default ShortFormPlayer;
