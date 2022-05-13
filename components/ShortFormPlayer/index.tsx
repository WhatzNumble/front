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
  const [videos, setVideos] = useState<Video[]>([]);
  const [playVideo, setPlayVideo] = useState(-1);
  const [inViewIndex, setInVewIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(videos.length - 1);
  const [page, setPage] = useState(1);
  const videoListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVideos([...preLoadedVideos]);
  }, [preLoadedVideos]);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/home'); // 해당 라우트는
      console.log(res);
    })();
  }, []);

  useEffect(() => {
    setPlayVideo(inViewIndex);
  }, [inViewIndex]);

  const onClickPlayer = () => {
    playVideo > -1 ? setPlayVideo(-1) : setPlayVideo(inViewIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entry) => {
        entry.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetID = parseInt(entry.target.id.replace(/[^0-9.]/g, ''));
            setInVewIndex(targetID);
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
    if (query && videos.length - requestIndex === inViewIndex) {
      console.log(`callAPI page: ${page} videolength: ${videos.length}`);
      //if api respnose success
      setVideos((prev) => [...prev, ...mockVideos]);
      setLastIndex((prev) => prev + mockVideos.length);
      setPage((prev) => prev + 1);
    }
  }, [query, videos, inViewIndex, lastIndex, requestIndex, page]);

  return (
    <>
      <div className='VideoListWrapper' ref={videoListRef} onClick={onClickPlayer}>
        {videos.map((video, index) => {
          return (
            <Player
              key={index}
              playerID={`player_${index}`}
              inViewPort={index === inViewIndex}
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
            -ms-overflow-style: none;
            scrollbar-width: none;
            overflow: scroll;
            scroll-snap-type: y mandatory;
            background-color: #000;
          }
          .VideoListWrapper::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default ShortFormPlayer;
