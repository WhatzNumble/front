import Controller from "./Controller";

interface Props {
  isEmbed?: boolean;
  videoSrc?: string;
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
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fcookpete.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        ) : (
          <video className='Shorts' src={videoSrc} />
        )}
        <Controller
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
