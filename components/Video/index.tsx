import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ControllerMask from "./ControllerMask";

const YoutubeEmbedPlayer = dynamic(() => import("./YoutubeEmbedPlayer"), {
  ssr: false,
});

interface Props {
  isEmbed?: boolean;
  videoSrc: string;
}

export enum Commands {
  play,
  pause,
  stop,
  mute,
  unMute,
}

const Video: React.FC<Props> = ({ isEmbed = false, videoSrc }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [command, setCommand] = useState<Commands | null>(null);

  const movePrev = () => {
    console.log("prev");
  };
  const moveNext = () => {
    console.log("next");
  };
  const likeVideo = () => {
    console.log("like");
  };
  const pauseVideo = () => {
    console.log("pause");
    setCommand(Commands.pause)
    setPlaying(false);
  };
  const startVideo = () => {
    setCommand(Commands.play)
    setPlaying(true);
  }

  return (
    <>
      <div className='Video'>
        {isEmbed ? (
          <YoutubeEmbedPlayer embedID={videoSrc} command={command} onRendered={startVideo} />
        ) : (
          <video className='Shorts' src={videoSrc} />
        )}
        <ControllerMask
          onDoubleTap={likeVideo}
          onTap={playing ? pauseVideo: startVideo}
          onSwipeDown={movePrev}
          onSwipeUp={moveNext}
        />
      </div>
      <style jsx>{`
        .Video {
          width: 100%;
          height: calc(100% - 50px;
        }
      `}</style>
    </>
  );
};

export default Video;
