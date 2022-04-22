import { useRef, useState } from "react";
import { Commands } from "..";
import PlayerUI from "./PlayerUI";

interface Props {
  command?: Commands | null;
  videoSrc: string;
}

type PlayerState = {
  playing: boolean;
  mute: boolean;
  like: boolean;
  detail: boolean;
};

const DefaultPlayer: React.FC<Props> = ({ videoSrc, command }) => {
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(false);
  const [detail, setDetail] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggle = (input: string) => {
    switch (input) {
      case "mute":
        setMute((prev) => !prev);
        break;
      case "like":
        setLike((prev) => !prev);
        break;
      case "detail":
        setDetail((prev) => !prev);
        break;
      case "play":
        handleVideoPress();
        break;
    }
  };

  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
      setPlaying((play) => !play);
    }
  };

  const onLoadMetaData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  return (
    <>
      <video
        className='DefaultPlayer'
        onClick={handleVideoPress}
        ref={videoRef}
        muted={mute}
        loop
        webkit-playsinline
        playsInline
        src={videoSrc}
        onLoadedMetadata={onLoadMetaData}
        onTimeUpdate={onTimeUpdate}
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
