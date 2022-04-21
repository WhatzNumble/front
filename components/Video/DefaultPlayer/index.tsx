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
      />
      <PlayerUI
        title='mocksting'
        muted={mute}
        like={like}
        detail={detail}
        detailInfo='detail INFO'
        likeCount={777}
        handleToggle={handleToggle}
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
