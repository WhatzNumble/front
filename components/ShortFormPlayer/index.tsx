import { useState, useEffect } from 'react';
import axios from 'axios';

import { Video } from 'libs/types';
import Player from './Player';

interface Props {
  query?: string;
  preLoadedVideos: Video[];
}

const ShortFormPlayer: React.FC<Props> = ({ query, preLoadedVideos }) => {
  const [videos, setVideos] = useState<Video[]>([...preLoadedVideos]);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/api/home');
      console.log(res);
    })();
  }, []);

  return (
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
    </>
  );
};

export default ShortFormPlayer;
