import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Video } from 'libs/types';
import Player from './Player';
import mockVideos from './mockVideos';
import PlayStatusIcon from './PlayStatusIcon';

interface Props {
  isEditable?: boolean;
  query?: string;
  fixedList?: boolean;
  preLoadedVideos: Video[];
  requestIndex?: number;
}

const ShortFormPlayer: React.FC<Props> = ({
  query,
  fixedList = false,
  preLoadedVideos,
  requestIndex = 4,
  isEditable = false,
}) => {
  const [blockRequest, setBlockRequest] = useState(fixedList);
  const [videos, setVideos] = useState<Video[]>([...preLoadedVideos]);
  const [playVideo, setPlayVideo] = useState(-1);
  const [inViewIndex, setInVewIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(videos.length - 1);
  const [page, setPage] = useState(0);
  const videoListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      const res = await axios.get('/api/home'); // 해당 라우트는
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
    if (lastIndex - requestIndex === inViewIndex) {
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
        {videos?.map((video, index) => {
          return (
            <Player
              key={index}
              playerID={`player_${index}`}
              active={index === playVideo}
              isEditable={isEditable}
              video={video}
            />
          );
        })}
      </div>
      <PlayStatusIcon playing={playVideo !== -1} />
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
