import { useEffect, useRef, useState } from 'react';
import { IPlayer } from '..';
import PlayerUI from '../PlayerUI';
import ReactHlsPlayer from 'react-hls-player';
import PlayStatusIcon from '../PlayStatusIcon';

const DefaultPlayer: React.FC<IPlayer> = ({ isPlaying, video, isEditable }) => {
  const { directDir } = video;
  const [loading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (directDir) {
      handleVideo(isPlaying ? 'play' : 'stop');
    }
  }, [directDir, isPlaying]);

  const handleVideo = (input: string) => {
    switch (input) {
      case 'play':
        playerRef.current?.play();
        setPlaying(true);
        break;
      case 'pause':
        setPlaying(false);
        playerRef.current?.pause();
        break;
      case 'stop':
        setPlaying(false);
        playerRef.current?.pause();
        if (playerRef.current?.currentTime) {
          playerRef.current.currentTime = 0;
        }
    }
  };

  const onVideoLoadEnd = () => {
    setIsLoading(false);
  };

  const onClickVideo = () => {
    handleVideo(playing ? 'pause' : 'play');
  };

  return (
    <>
      {directDir && (
        <ReactHlsPlayer
          className='DefaultPlayer'
          playerRef={playerRef}
          muted={mute}
          width='100%'
          height='100%'
          loop
          src={directDir}
          onLoadedData={onVideoLoadEnd}
          onClick={onClickVideo}
        />
      )}
      <PlayStatusIcon playing={playing} loading={loading} />;
      <PlayerUI video={video} isEditable={isEditable} />
      <style jsx>{`
        .DefaultPlayer {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default DefaultPlayer;
