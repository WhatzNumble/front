import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from 'components/Layout';
import type { Props as VideoProps } from 'components/Video';

const Video = dynamic(() => import('components/Video'), { ssr: false });

const mockVideos: VideoProps[] = [
  {
    id: 'mock',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'mock',
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
  },
  {
    id: 'mock',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
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
    <Layout>
      <div className='VideosContainer'>
        {videos?.map(({ id, isEmbed, videoSrc }, index) => {
          return <Video key={index} id={id} isEmbed={isEmbed} videoSrc={videoSrc} />;
        })}
      </div>
      <style jsx>
        {`
          .VideosContainer {
            position: relative;
            width: 100%;
            height: calc(100% - 20px);
            overflow: scroll;
            scroll-snap-type: y mandatory;
          }
        `}
      </style>
    </Layout>
  );
};

export default Test;
