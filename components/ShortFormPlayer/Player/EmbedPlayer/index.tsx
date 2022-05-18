import { useRef, useEffect, MutableRefObject, useCallback } from 'react';

import { IPlayer } from '..';
import PlayStatusIcon from '../PlayStatusIcon';
import PlayerUI from '../PlayerUI';
import Mask from './Mask';

interface Props extends IPlayer {
  blockTouch?: boolean;
}

const extractIdFromURL = (url: string) => {
  const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  return regex.exec(url);
};

const EmbedPlayer: React.FC<Props> = ({ video, blockTouch, isEditable, isPlaying, inViewPort }) => {
  const { videoTitle, embedLink } = video;
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);
  const embedSrc = `https://www.youtube.com/embed/?playlist=${extractIdFromURL(
    embedLink || ''
  )}&rel=0&modestbranding=1&enablejsapi=1&controls=0&loop=1&showinfo=0&autohide=1`;

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
    console.log(inViewPort);
    if (inViewPort) {
      sendCommand(isPlaying ? 'playVideo' : 'pauseVideo');
    } else {
      sendCommand('stopVideo');
    }
  }, [inViewPort, isPlaying, sendCommand]);

  return (
    <>
      <iframe
        ref={iframeVideoRef}
        width='100%'
        height='100%'
        src={embedSrc}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen
        title={videoTitle}
      />
      <PlayStatusIcon playing={isPlaying} />;
      <PlayerUI video={video} isEditable={isEditable} />
      {blockTouch && <Mask />}
    </>
  );
};

export default EmbedPlayer;
