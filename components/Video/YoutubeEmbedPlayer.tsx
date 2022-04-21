import { useRef, useEffect, MutableRefObject, useCallback } from "react";
import { Commands } from ".";

interface Props {
  embedID: string;
  command?: Commands | null;
}

const YoutubeEmbedPlayer: React.FC<Props> = ({ embedID, command }) => {
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);

  const isRenderedIframePlayer = (ref: MutableRefObject<HTMLIFrameElement | null>) => {
    const iframe = ref.current;
    if (iframe) {
      const src = iframe.getAttribute("src");
      if (src) {
        return !!iframe.contentWindow;
      }
    }
  };

  const sendCommand = useCallback((func: string, args?: any) => {
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
  }, []);

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
    }
  }, [command, sendCommand]);

  return (
    <iframe
      ref={iframeVideoRef}
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/${embedID}?playlist=${embedID}&modestbranding=1&enablejsapi=1&controls=0&autoplay=1&loop=1`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
      allowFullScreen
      title={embedID}
    />
  );
};

export default YoutubeEmbedPlayer;
