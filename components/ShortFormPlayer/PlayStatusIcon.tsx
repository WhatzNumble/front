import Image from 'next/image';
import { useEffect } from 'react';

interface Props {
  playing: boolean;
}

const PlayStatusIcon: React.FC<Props> = ({ playing }) => {
  useEffect(() => {}, [playing]);
  const icon = playing ? '/icon/player/btn_play.svg' : '/icon/player/btn_pause.svg';
  return (
    <div className='playStatus' key={icon}>
      <Image src={icon} width={84} height={84} alt='play state icon' />
      <style jsx>
        {`
          @keyframes fadeout {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          .playStatus {
            position: absolute;
            bottom: calc(50% - 56px);
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            animation: fadeout 1s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PlayStatusIcon;
