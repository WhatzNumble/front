import { useRef, useEffect, MutableRefObject, useCallback } from 'react';
import { IVideo } from '..';
import PlayerUI from '../DefaultPlayer/PlayerUI';
import Mask from './Mask';

interface Props {
  video: IVideo;
  active: boolean;
  blockTouch?: boolean;
}

const EmbedPlayer: React.FC<Props> = ({ video, active, blockTouch }) => {
  const { uploader, like, detail, videoSrc, id, view, title, date } = video;
  const iframeVideoRef = useRef<HTMLIFrameElement | null>(null);
  const embedSrc = `https://www.youtube.com/embed/?playlist=${videoSrc}&rel=0&modestbranding=1&enablejsapi=1&controls=0&autoplay=1&loop=1&showinfo=0&autohide=1`;

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
        src={embedSrc}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen
        title={videoSrc}
      />
      <PlayerUI
        videoID={id}
        title={title}
        like={like}
        detail={detail}
        uploader={uploader}
        view={view}
        date={date}
      />
      {blockTouch && <Mask />}
    </>
  );
};

export default EmbedPlayer;
