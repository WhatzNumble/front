import React, { useEffect, useRef, useState } from 'react';
import PlayerUI from '../PlayerUI';
import ReactHlsPlayer from 'react-hls-player';
import { editableVideo } from 'libs/types';

interface Props extends editableVideo {
  active: boolean;
}

const DefaultPlayer: React.FC<Props> = ({ active, video, isEditable }) => {
  const { directDir } = video;
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (directDir) {
      handleVideo(active ? 'play' : 'pause');
    }
  }, [directDir, active]);

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

  const handleVideoPress = () => {
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
          onClick={handleVideoPress}
        />
      )}
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
