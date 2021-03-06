import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

import useToastMessage from 'hooks/useToastMessage';
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
  const { pushToast } = useToastMessage();
  const videoListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVideos([...preLoadedVideos]);
  }, [preLoadedVideos]);

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

  const getVideo = async (query: string, page: number, size: number) => {
    try {
      const res = await axios.get(query, { params: { page: page, size: size } });
      if (res.data.videos && res.data.videos.length) {
        const { videos } = res.data;
        setVideos((prev) => [...prev, ...videos]);
        setLastIndex((prev) => prev + videos.length);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      pushToast('video api error');
    }
  };

  const getMockVideo = async () => {
    setVideos((prev) => [...prev, ...mockVideos]);
    setLastIndex((prev) => prev + mockVideos.length);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (query && videos.length - requestIndex === inViewIndex) {
      console.log(`callAPI page: ${page} videolength: ${videos.length}`);
      // getMockVideo();
      getVideo(query, page, 5);
    }
  }, [query, videos, inViewIndex, lastIndex, requestIndex, page]);

  return (
    <>
      <div className='VideoListWrapper' ref={videoListRef} >
        {videos.map((video, index) => {
          return (
            <Player
              key={index}
              playerID={`player_${index}`}
              inViewPort={index === inViewIndex}
              isPlaying={index === playVideo}
              isEditable={isEditable}
              onClickVideo={onClickPlayer}
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
