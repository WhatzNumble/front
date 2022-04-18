import React from "react";

interface Props {
  isEmbed?: boolean;
  videoSrc?: string;
}

const index: React.FC<Props> = ({ isEmbed = false, videoSrc }) => {
  return (
    <div>
      {isEmbed ? (
        <iframe
          width='491'
          height='873'
          src={`https://www.youtube.com/embed/${videoSrc}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />
      ) : (
        <video src={videoSrc} />
      )}
    </div>
  );
};

export default index;
