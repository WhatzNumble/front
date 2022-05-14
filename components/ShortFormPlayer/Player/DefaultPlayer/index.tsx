import React, { useEffect, useRef, useState } from 'react';
import PlayerUI from '../PlayerUI';
import ReactHlsPlayer from 'react-hls-player';
import { editableVideo } from 'libs/types';
import PlayStatusIcon from './PlayStatusIcon';

interface Props extends editableVideo {
  inViewPort: boolean;
}

const DefaultPlayer: React.FC<Props> = ({ inViewPort, video, isEditable }) => {
  const { directDir } = video;
  const [loading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (directDir) {
      handleVideo(inViewPort? 'play' : 'stop');
    }
  }, [directDir, inViewPort]);

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
    console.log('ttt');
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
