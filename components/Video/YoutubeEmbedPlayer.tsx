import { useRef, useEffect, MutableRefObject } from "react";
import { Commands } from "./index";

interface Props {
  embedID: string;
  command?: Commands | null;
  onRendered: () => void;
}

const YoutubeEmbedPlayer: React.FC<Props> = ({ embedID, command, onRendered }) => {
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);

  const isRenderedIframePlayer = (ref: MutableRefObject<HTMLIFrameElement | null>) => {
    const iframe = iframeVideoRef.current;
    if (iframe) {
      const src = iframe.getAttribute("src");
      if (src) {
        return !!iframe.contentWindow;
      }
    }
  };

  const sendCommand = (func: string, args?: any) => {
    if (isRenderedIframePlayer(iframeVideoRef)) {
      iframeVideoRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: func,
          args: args || [],
        }),
        "*"
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onRendered();
    }, 1000);
  }, [onRendered]);

  useEffect(() => {
    switch (command) {
      case Commands.play:
        sendCommand("playVideo");
        console.log("play");
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
      default:
        sendCommand("playVideo");
    }
  }, [command]);
  return (
    <>
      <iframe
        ref={iframeVideoRef}
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${embedID}?modestbranding=1&enablejsapi=1&controls=0&autoplay=1&mute=1`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen
        title={embedID}
      />
    </>
  );
};

export default YoutubeEmbedPlayer;
