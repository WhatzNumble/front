import { useRef, useEffect, MutableRefObject, useCallback } from 'react';
import Mask from './Mask';

interface Props {
  embedID: string;
  active: boolean;
  blockTouch?: boolean;
}

const EmbedPlayer: React.FC<Props> = ({ embedID, active, blockTouch }) => {
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);

  const isRenderedIframePlayer = (ref: MutableRefObject<HTMLIFrameElement | null>) => {
    const iframe = ref.current;
    if (iframe) {
      const src = iframe.getAttribute('src');
      if (src) {
        return !!iframe.contentWindow;
      }
    }
  };

  const sendCommand = useCallback((func: string, args?: any) => {
    if (isRenderedIframePlayer(iframeVideoRef)) {
      iframeVideoRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: func,
          args: args || [],
        }),
        '*'
      );
    }
  }, []);

  useEffect(() => {
    sendCommand(active ? 'playVideo' : 'stopVideo');
  }, [active]);

  return (
    <>
      <iframe
        ref={iframeVideoRef}
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/?playlist=${embedID}&rel=0&modestbranding=1&enablejsapi=1&controls=0&autoplay=1&loop=1&showinfo=0&autohide=1`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen
        title={embedID}
      />
      {blockTouch && <Mask />}
    </>
  );
};

export default EmbedPlayer;