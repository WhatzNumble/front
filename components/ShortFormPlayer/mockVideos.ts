import { Video } from 'libs/types';

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

const mockVideos: Video[] = [
  {
    videoId: 1,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: '/bipbop-advanced/bipbop_16x9_variant.m3u8',
    embedLink: null,
  },
  {
    videoId: 2,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: '/bipbop-advanced/bipbop_16x9_variant.m3u8',
    embedLink: null,
  },
  {
    videoId: 3,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: '/bipbop-advanced/bipbop_16x9_variant.m3u8',
    embedLink: null,
  },
  {
    videoId: 4,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: '/bipbop-advanced/bipbop_16x9_variant.m3u8',
    embedLink: null,
  },
  {
    videoId: 5,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: '/bipbop-advanced/bipbop_16x9_variant.m3u8',
    embedLink: null,
  },
  {
    videoId: 6,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: null,
    embedLink: 'https://youtube.com/shorts/E4BR0sAM3-8?feature=share',
  },
  {
    videoId: 7,
    nickname: 'user1',
    profile: '/mock/profile.png',
    videoLike: 5,
    videoTitle: 'videoTitle1',
    videoContent: detailMockString,
    videoCreationDate: '2022-05-06T12:07:35.052847',
    videoViews: 20,
    videoThumbnail: '/mock/profile.png',
    directDir: null,
    embedLink: 'https://www.youtube.com/watch?v=_whaAD__3vI',
  },
];

export default mockVideos;
