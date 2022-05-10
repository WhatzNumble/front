import { useState, useEffect } from 'react';
import axios from 'axios';

import { Video } from 'libs/types';
import Player from './Player';
import mockVideos from './mockVideos';

interface Props {
  query?: string;
  preLoadedVideos: Video[];
  requestIndex?: number;
}

const ShortFormPlayer: React.FC<Props> = ({ query, preLoadedVideos, requestIndex = 4 }) => {
  const [videos, setVideos] = useState<Video[]>([...preLoadedVideos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(videos.length - 1);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/api/home');
      console.log(res);
    })();
  }, []);

  useEffect(() => {
    console.log(activeIndex);
    if (lastIndex - requestIndex === activeIndex) {
      console.log('callAPI');
      setVideos((prev) => [...prev, ...mockVideos]);
      setLastIndex((prev) => prev + mockVideos.length);
    }
  }, [videos, activeIndex]);

  return (
    <>
      <div className='VideosContainer'>
        {videos?.map((video, index) => {
          return (
            <Player
              key={index}
              activeCallback={() => {
                setActiveIndex(index);
                console.log('!!' + index);
              }}
              video={video}
            />
          );
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
