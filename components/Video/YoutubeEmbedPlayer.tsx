import { useRef, useEffect } from "react";

export enum Commands {
  play,
  pause,
  stop,
  mute,
  unMute,
}

interface Props {
  embedID: string;
  command?: Commands;
}

const YoutubeEmbedPlayer: React.FC<Props> = ({ embedID, command }) => {
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);
  const sendCommand = (func: string, args?: any) => {
    const iframe = iframeVideoRef.current;
    if (iframe) {
      const src = iframe.getAttribute("src");
      if (src) {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: func,
              args: args || [],
            }),
            "*"
          );
        }
      }
    }
  };

  useEffect(() => {
    switch (command) {
      case Commands.play:
        sendCommand("playVideo");
        break;
      case Commands.stop:
        sendCommand("stopVideo");
        break;
      case Commands.pause:
        sendCommand("pauseVideo");
        break;
      case Commands.mute:
        sendCommand("mute");
        break;
      case Commands.unMute:
        sendCommand("unMute");
        break;
    }
  }, [command]);
  return (
    <>
      <iframe
        width='100%'
        height='95%'
        src={`https://www.youtube.com/embed/${embedID}?modestbranding=1&enablejsapi=1&controls=0`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </>
  );
};

export default YoutubeEmbedPlayer;
