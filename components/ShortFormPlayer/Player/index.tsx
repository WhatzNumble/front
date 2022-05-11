import { useRef } from 'react';
import dynamic from 'next/dynamic';

import { editableVideo } from 'libs/types';
import EmbedPlayer from './EmbedPlayer';

const DefaultPlayer = dynamic(() => import('./DefaultPlayer'), {
  ssr: false,
});

interface Props extends editableVideo {
  playerID: string;
  activeCallback: () => void;
  active: boolean;
}

const Player: React.FC<Props> = ({ playerID, video, activeCallback, isEditable, active }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { embedLink } = video;

  return (
    <>
      <div className='Video' id={playerID} style={{ opacity: active ? 1 : 0.7 }} ref={ref}>
        {embedLink ? (
          <EmbedPlayer video={video} active={active} blockTouch />
        ) : (
          <DefaultPlayer active={active} video={video} />
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
