import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DefaultPlayer from './DefaultPlayer';
import useIntersection from 'hooks/useInterSection';

const YoutubeEmbedPlayer = dynamic(() => import('./YoutubeEmbedPlayer'), {
  ssr: false,
});

export interface VideoProps {
  id: string;
  isEmbed?: boolean;
  videoSrc: string;
}

export enum Commands {
  play,
  pause,
  stop,
  mute,
  unMute,
}

const Video: React.FC<VideoProps> = ({ isEmbed = false, videoSrc }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isOnScreen = useIntersection(ref, '-50% 0% -50% 0%');

  return (
    <>
      <div className='Video' ref={ref}>
        {isEmbed ? (
          <YoutubeEmbedPlayer embedID={videoSrc} active={isOnScreen} />
        ) : (
          <DefaultPlayer active={isOnScreen} videoSrc={videoSrc} />
        )}
      </div>
      <style jsx>{`
        .Video {
          position: relative;
          scroll-snap-align: end;
          width: 100%;
          height: 100%;
          background: black;
          border-radius: 32px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Video;
