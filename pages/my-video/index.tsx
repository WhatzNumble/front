import Layout, { TAB_HEIGHT } from 'components/Layout';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Video } from 'libs/types';
import VideoCard from 'components/VideoCard';
import PopBox from 'components/PopBox';
import cookies from 'next-cookies';
import config from 'utils/config';
import useToastMessage from 'hooks/useToastMessage';
import mockVideos from 'components/ShortFormPlayer/mockVideos';

const HEIGHT = 85;

interface Props {
  videos: Video[];
  errorMsg: string;
}

function MyVideo({ videos, errorMsg }: Props) {
  const router = useRouter();
  const { pushToast } = useToastMessage();
  const [showUpload, setShowUploads] = useState(false);

  const onClickUpload = () => {
    setShowUploads(true);
  };

  const onClickClose = () => {
    setShowUploads(false);
  };

  const onCardClick = (id: number) => {
    const clone = videos.map((vd) => ({ ...vd }));
    const selectedIndex = clone.findIndex((vd) => id === vd.videoId);
    const extract = clone.splice(selectedIndex, 1);
    if (extract.length) {
      clone.unshift(extract[0]);
    }
    router.push(
      {
        pathname: `${router.pathname}/play`,
        query: {
          playList: JSON.stringify(clone),
        },
      },
      `${router.pathname}/play`
    );
  };

  useEffect(() => {
    if (errorMsg) {
      pushToast(errorMsg);
    }
  }, []);

  return (
    <Layout title='마이 비디오'>
      <div className='MyVideo'>
        {videos.length ? (
          <div className='video-box'>
            <div className='button-upload'>
              <button className='theme-main' onClick={onClickUpload}>
                영상 업로드 하기
              </button>
            </div>
            <div className='cards'>
              <div className='space'></div>
              {videos.map((vd) => (
                <VideoCard key={vd.videoId} video={vd} onCardClick={onCardClick} />
              ))}
            </div>
          </div>
        ) : (
          <div className='empty-box'>
            <h2 className='text gray'>업로드된 영상이 없습니다.</h2>
            <Image src='/image/video_empty.png' alt='Empty' width={150} height={157.3} />
            <div className='buttons'>
              <UploadLink
                self={<button className='theme-main'>직접 영상 업로드 하기</button>}
                embed={<button className='embed'>임베드 영상 업로드 하기</button>}
              />
            </div>
          </div>
        )}
        <PopBox show={showUpload} onClosePopBox={onClickClose}>
          <div className='up'>
            <h2 className='text'>영상 업로드 하기</h2>
            <UploadLink
              self={<button className='button-self'>직접 영상 업로드 하기</button>}
              embed={<button className='button-embed'>임베드 영상 업로드 하기</button>}
            />
          </div>
        </PopBox>
        <style jsx>{`
          $dark: #2c2c2c;

          .MyVideo {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: auto;
          }

          .video-box {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 0 16px 0 16px;
            .space {
              height: ${HEIGHT}px;
              grid-column-start: 1;
              grid-column-end: 4;
            }
          }

          .gray {
            color: #b8b8b8;
            font-weight: normal;
          }

          .up {
            .text {
              color: $dark;
              font-size: 14px;
              margin-bottom: 10px;
            }
            button {
              font-weight: bold;
              font-size: 18px;
              background-color: var(--white);
              color: $dark;
            }
            button[class*='button-'] {
              padding: 6px 0;
              text-align: left;
              width: 100%;
            }
          }

          .button-upload {
            z-index: 2;
            position: fixed;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 20px 0 0 0;
            min-height: ${HEIGHT}px;
            button {
              height: 48px;
              padding: 0 20px;
            }
          }

          .empty-box {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .buttons {
              margin-top: 50px;
            }
            .text {
              font-size: 16px;
              color: var(--gray-2);
              margin-bottom: 16px;
            }
          }

          .buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            button {
              width: 280px;
              height: 48px;
              font-size: 16px;
              border-radius: 50px;
              margin: 4px 0;
              &.embed {
                color: var(--white);
                background-color: var(--black);
                border: 1px solid #8f8f8f;
              }
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}

function UploadLink({ self, embed }: { self: React.ReactNode; embed: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Link href={`${router.pathname}/upload/self`}>
        <a>{self}</a>
      </Link>
      <Link href={`${router.pathname}/upload/embed`}>
        <a>{embed}</a>
      </Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { apiBaseURL } = config;
  const allCookies = cookies(ctx);
  let result;
  let errorMsg = '';
  try {
    const token = allCookies['access-token'] || '';
    if (!token) {
      throw new Error();
    }

    const res = await fetch(`${apiBaseURL}/video?page=1&size=3`, {
      headers: {
        'x-auth-token': token,
      },
    });

    if (res.ok) {
      result = await res.json();
    } else {
      throw new Error();
    }
  } catch (ex) {
    errorMsg = '조회중 문제가 발생하였습니다.';
    result = {
      videos: [],
    };
  }

  return {
    props: {
      errorMsg,
      videos: result.videos,
       // videos: mockVideos,
    },
  };
};

export default MyVideo;
