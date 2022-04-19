import dynamic from "next/dynamic";
import ControllerMask from "./ControllerMask";

const YoutubeEmbedPlayer = dynamic(() => import("./YoutubeEmbedPlayer"), {
  ssr: false,
});

interface Props {
  isEmbed?: boolean;
  videoSrc: string;
}

const index: React.FC<Props> = ({ isEmbed = false, videoSrc }) => {
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
  };

  return (
    <>
      <div className='Video'>
        {isEmbed ? (
          <YoutubeEmbedPlayer embedID={videoSrc} />
        ) : (
          <video className='Shorts' src={videoSrc} />
        )}
        <ControllerMask
          onDoubleTap={likeVideo}
          onTap={pauseVideo}
          onSwipeDown={movePrev}
          onSwipeUp={moveNext}
        />
      </div>
      <style jsx>{`
        .Video {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default index;
