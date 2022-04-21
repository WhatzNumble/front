import { useEffect, useRef, useState } from "react";
import { Commands } from ".";
import PlayerUI from "./PlayerUI";

interface Props {
  command?: Commands | null;
  videoSrc: string;
}

const DefaultPlayer: React.FC<Props> = ({ videoSrc, command }) => {
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleLikePress = () => {
    setLike((prev) => !prev);
  };
  const handleMutePress = () => {
    setMute((prev) => !prev);
  };
  const handleVideoPress = () => {
    console.log("handle");
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
        src={videoSrc}
      />
      <PlayerUI title='mocksting' muted={mute} like={like} likeCount={777} handleMute={handleMutePress} handleLike={handleLikePress} />
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
