import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from 'components/Layout';
import type { IUploadUser, IVideo } from 'components/Video';

const Video = dynamic(() => import('components/Video'), { ssr: false });

const detailMockString: string = `
1. Use gridlines to balance your shot.
2. Set your camera's focus.
3. Focus on one subject.
4. Embrace negative space.
5. Find different perspectives.
6. Play with reflections.
7. Use leading lines.
8. Look for symmetry.
9. Keep an eye out for repetitive patterns.
10. Play around with color blocking.
11. Avoid zooming in.
12. Capture small details.
13. Use natural light.
14. If you use flash, only do so during the day.
`;

const mockProfile: IUploadUser = {
  name: 'test User',
  avatar: '/avatar.png',
};

export const mockVideos: IVideo[] = [
  {
    id: 'mock',
    title: 'mock Title',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
    view: 2222,
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
  {
    id: 'mock',
    title: 'youtube Embed',
    isEmbed: true,
    view: 2222,
    videoSrc: 'tGSvvcqhmwM',
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
  {
    id: 'mock',
    title: 'mock Title',
    view: 2222,
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
  {
    id: 'mock',
    title: 'youtube Embed',
    view: 2222,
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
  {
    id: 'mock',
    title: 'mock Title',
    view: 2222,
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
  {
    id: 'mock',
    title: 'youtube Embed',
    view: 2222,
    isEmbed: true,
    videoSrc: 'tGSvvcqhmwM',
    uploader: mockProfile,
    like: 777,
    detail: detailMockString,
    date: '2022.12.22',
  },
];

interface Props {
  query: string;
}

const Test: NextPage<Props> = ({ query }) => {
  const [videos, setVideos] = useState<IVideo[]>(mockVideos);

  return (
    <Layout tabBarTransparent>
      <div className='VideosContainer'>
        {videos?.map((video, index) => {
          return <Video key={index} video={video} />;
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
