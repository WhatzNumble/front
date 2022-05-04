import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from 'components/Layout';
import type { VideoProps } from 'components/Video';

const Video = dynamic(() => import('components/Video'), { ssr: false });

export const mockVideos: VideoProps[] = [
  {
    id: 'mock',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
];

const Test: NextPage = () => {
  const [videos, setVideos] = useState<VideoProps[]>(mockVideos);

  return (
    <Layout tabBarTransparent>
      <div className='VideosContainer'>
        {videos?.map(({ id, isEmbed, videoSrc }, index) => {
          return <Video key={index} id={id} isEmbed={isEmbed} videoSrc={videoSrc} />;
        })}
      </div>
      <style jsx>
        {`
          .VideosContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: scroll;
            scroll-snap-type: y mandatory;
            background-color: #000;
          }
        `}
      </style>
    </Layout>
  );
};

export default Test;
