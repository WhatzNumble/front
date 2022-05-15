import Image from 'next/image';

interface Props {
  loading?: boolean;
  playing: boolean;
}

const PlayStatusIcon: React.FC<Props> = ({ loading, playing }) => {
  const icon = playing ? '/icon/player/play_state.svg' : '/icon/player/pause_state.svg';
  return (
    <div className='playStatus'>
      {loading ? (
        <Image src='/loading.gif' width={40} height={40} alt='loading video' />
      ) : (
        <div className='animate' key={icon}>
          <Image src={icon} width={84} height={84} alt='play state icon' />
        </div>
      )}
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
            pointer-events: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .animate {
              animation: fadeout 1s forwards;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PlayStatusIcon;
