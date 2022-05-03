import useIntersection from 'hooks/useInterSection';
import { useEffect, useRef, useState } from 'react';
import { Commands } from '..';
import PlayerUI from './PlayerUI';
import ReactHlsPlayer, { HlsPlayerProps } from 'react-hls-player';

interface Props {
  command?: Commands | null;
  active: boolean;
  videoSrc: string;
}

type PlayerState = {
  playing: boolean;
  mute: boolean;
  like: boolean;
  detail: boolean;
};

const DefaultPlayer: React.FC<Props> = ({ videoSrc, active }) => {
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(false);
  const [detail, setDetail] = useState(false);
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
      case 'like':
        setLike((prev) => !prev);
        break;
      case 'detail':
        setDetail((prev) => !prev);
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
        title='mocksting'
        muted={mute}
        like={like}
        detail={detail}
        detailInfo='detail INFO'
        likeCount={777}
        handleToggle={handleToggle}
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
