import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Video } from 'libs/types';
import EmbedPlayer from './EmbedPlayer';
import useIntersection from 'hooks/useInterSection';

const DefaultPlayer = dynamic(() => import('./DefaultPlayer'), {
  ssr: false,
});

interface Props {
  video: Video;
}

const Player: React.FC<Props> = ({ video }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isOnScreen = useIntersection(ref, '-50% 0% -50% 0%');
  const { embedLink } = video;

  return (
    <>
      <div className='Video' style={{ opacity: isOnScreen ? 1 : 0.7 }} ref={ref}>
        {embedLink? (
          <EmbedPlayer video={video} active={isOnScreen} blockTouch />
        ) : (
          <DefaultPlayer active={isOnScreen} video={video} />
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

export default Player;
