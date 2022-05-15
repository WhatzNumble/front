import { useRef } from 'react';
import dynamic from 'next/dynamic';

import { editableVideo } from 'libs/types';
import EmbedPlayer from './EmbedPlayer';

const DefaultPlayer = dynamic(() => import('./DefaultPlayer'), {
  ssr: false,
});

interface Props extends editableVideo {
  playerID: string;
  inViewPort: boolean;
}

const Player: React.FC<Props> = ({ playerID, video, isEditable, inViewPort }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { embedLink } = video;

  return (
    <>
      <div className='Video' id={playerID} style={{ opacity: inViewPort ? 1 : 0.7 }} ref={ref}>
        {embedLink ? (
          <EmbedPlayer video={video} inViewPort={inViewPort} isEditable={isEditable} blockTouch />
        ) : (
          <DefaultPlayer video={video} inViewPort={inViewPort} isEditable={isEditable} />
        )}
      </div>
      <style jsx>{`
        .Video {
          position: relative;
          scroll-snap-align: end;
          scroll-margin-bottom: 56px;
          width: 100%;
          height: calc(100% - 56px);
          background: var(--black);
          border-radius: 32px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Player;
