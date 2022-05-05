import React, { useEffect, useRef, useState } from 'react';
import PlayerUI from './PlayerUI';
import ReactHlsPlayer from 'react-hls-player';
import { IVideo } from '..';

interface Props {
  active: boolean;
  video: IVideo;
}

const DefaultPlayer: React.FC<Props> = ({ active, video }) => {
  const { uploader, like, detail, videoSrc, id, view, title, date } = video;
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    handleVideo(active ? 'play' : 'stop');
  }, [active]);

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

  const handleToggle = (input: string) => {
    switch (input) {
      case 'mute':
        setMute((prev) => !prev);
        break;
      case 'play':
        handleVideoPress();
        break;
    }
  };

  const handleVideoPress = () => {
    handleVideo(playing ? 'pause' : 'play');
  };

  // playerTime Sync
  const onLoadMetaData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  return (
    <>
      <ReactHlsPlayer
        className='DefaultPlayer'
        playerRef={playerRef}
        muted={mute}
        width='100%'
        height='100%'
        loop
        src={videoSrc}
        onClick={handleVideoPress}
      />
      <PlayerUI
        videoID={id}
        title={title}
        muted={mute}
        like={like}
        detail={detail}
        uploader={uploader}
        view={view}
        date={date}
        progress={(currentTime / duration) * 100}
      />
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
