import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import DefaultPlayer from './DefaultPlayer';
import useIntersection from 'hooks/useInterSection';

const DefaultPlayer = dynamic(() => import('./DefaultPlayer'), {
  ssr: false,
});

const EmbedPlayer = dynamic(() => import('./EmbedPlayer'), {
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
          <EmbedPlayer embedID={videoSrc} active={isOnScreen} blockTouch />
        ) : (
          <DefaultPlayer active={isOnScreen} videoSrc={videoSrc} />
        )}
      </div>
      <style jsx>{`
        .Video {
          position: relative;
          scroll-snap-align: end;
          scroll-margin-bottom: 56px;
          width: 100%;
          height: calc(100% - 56px);
          background: black;
          border-radius: 32px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Video;
