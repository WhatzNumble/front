import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Video } from 'libs/types';
import Player from './Player';
import mockVideos from './mockVideos';

interface Props {
  isEditable?: boolean;
  query?: string;
  preLoadedVideos: Video[];
  requestIndex?: number;
}

const ShortFormPlayer: React.FC<Props> = ({
  query,
  preLoadedVideos,
  requestIndex = 4,
  isEditable = false,
}) => {
  const [videos, setVideos] = useState<Video[]>([...preLoadedVideos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(videos.length - 1);
  const videoListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/api/home');
      console.log(res);
    })();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entry) => {
        entry.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetID = parseInt(entry.target.id.replace(/[^0-9.]/g, ''));
            setActiveIndex(targetID);
          }
        });
      },
      { rootMargin: '0px', threshold: [1.0] }
    );
    if (videoListRef.current?.childNodes) {
      videoListRef.current?.childNodes.forEach((el) => observer.observe(el as Element));
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [videos, videoListRef]);

  useEffect(() => {
    console.log(activeIndex);
    if (lastIndex - requestIndex === activeIndex) {
      console.log('callAPI');
      setVideos((prev) => [...prev, ...mockVideos]);
      setLastIndex((prev) => prev + mockVideos.length);
    }
  }, [videos, activeIndex, lastIndex, requestIndex]);

  return (
    <>
      <div className='VideoListWrapper' ref={videoListRef}>
        {videos?.map((video, index) => {
          return (
            <Player
              key={index}
              playerID={`player_${index}`}
              activeCallback={() => {
                setActiveIndex(index);
                console.log('!!' + index);
              }}
              active={index === activeIndex}
              isEditable={isEditable}
              video={video}
            />
          );
        })}
      </div>
      <style jsx>
        {`
          .VideoListWrapper {
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
