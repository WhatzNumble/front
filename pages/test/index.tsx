import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, createRef } from 'react';

import Layout from 'components/Layout';
import type { VideoProps } from 'components/Video';
import useIntersection from 'hooks/useInterSection';

const Video = dynamic(() => import('components/Video'), { ssr: false });

const mockVideos: VideoProps[] = [
  {
    id: 'mock',
    videoSrc: 'https://d1dnwjifaecjjv.cloudfront.net/93210b1d-7c54-4208-84a3-c4bc97b02c64.m3u8',
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
            height: 100%;
            overflow: scroll;
            scroll-snap-type: y mandatory;
          }
        `}
      </style>
    </Layout>
  );
};

export default Test;
