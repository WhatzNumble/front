import { useState } from "react";
import dynamic from "next/dynamic";
import DefaultPlayer from "./DefaultPlayer";

const YoutubeEmbedPlayer = dynamic(() => import("./YoutubeEmbedPlayer"), {
  ssr: false,
});

export interface Props {
  id: string;
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
  const [command, setCommand] = useState<Commands | null>(null);
  return (
    <>
      <div className='Video'>
        {isEmbed ? (
          <YoutubeEmbedPlayer embedID={videoSrc} command={command} />
        ) : (
          <DefaultPlayer command={command} videoSrc={videoSrc} />
        )}
      </div>
      <style jsx>{`
        .Video {
          position: relative;
          scroll-snap-align: end;
          scroll-margin-bottom: 42px;
          width: 100%;
          height: 90vh;
          background: black;
        }
      `}</style>
    </>
  );
};

export default Video;
