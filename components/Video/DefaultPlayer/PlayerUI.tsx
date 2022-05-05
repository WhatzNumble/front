import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Avatar from './Avatar';
import { IUploadUser } from '..';
import Image from 'next/image';

interface Props {
  videoID: string;
  title: string;
  like: number;
  view: number;
  date: string;
  uploader: IUploadUser;
  muted?: boolean;
  detail: string;
  progress?: number;
}

const PlayerUI: React.FC<Props> = ({ videoID, view, date, title, like, progress, detail }) => {
  const [isLike, setIsLike] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleLike = () => {
    setIsLike((prev) => !prev);
  };

  const handleDetail = () => {
    setShowDetail((prev) => !prev);
  };

  return (
    <>
      <div className='PlayerUI'>
        <div className='leftWrapper'>
          <div className='detailWrapper'>
            <div className={showDetail ? 'detail' : 'hidden_detail'}>{detail}</div>
          </div>
          <div className='infoWrapper'>
            <Avatar link='test' avatarImage='/profile.png' />
            <div className='info'>
              <div className='title'>{title}</div>
              <div className='viewDate'>
                {`조회수 ${view}`}
                &#183;
                {date}
              </div>
            </div>
          </div>
        </div>
        <div className='buttonWrapper'>
          <div className='button'>
            <button onClick={() => handleDetail()}>
              <Image src={'/more_button.svg'} width={32} height={32} alt='bookmark' />
            </button>
          </div>
          <div className='button'>
            <button onClick={() => handleLike()}>
              <Image
                src={isLike ? '/bookmark_selected.svg' : '/bookmark.svg'}
                width={32}
                height={32}
                alt='bookmark'
              />
              <div className='count' style={isLike ? { opacity: 1 } : { opacity: 0.5 }}>
                {like}
              </div>
            </button>
          </div>
        </div>
        {!!progress && <ProgressBar progress={progress} />}
      </div>
      <style jsx>
        {`
          * {
            color: white;
          }
          .PlayerUI {
            z-index: 10;
            position: absolute;
            bottom: 0px;
            padding: 0 24px 24px 24px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            background: rgb(0, 0, 0);
            background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.61) 0%,
              rgba(0, 0, 0, 0.01) 100%
            );
          }

          .leftWrapper {
            max-width: 80%;
            .detailWrapper {
              font-weight: 500;
              font-size: 14px;
              line-height: 140%;
              display: flex;
              align-items: flex-end;
              letter-spacing: -0.002em;
              .detail {
                overflow: scroll;
                height: 260px;
              }
              .hidden_detail {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .infoWrapper {
              margin-top: 20px;
              display: flex;
              .info {
                margin-left: 12px;
                font-weight: 400;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: -0.002em;
                .title {
                  font-weight: 500;
                  font-size: 16px;
                }
                .viewDate {
                  opacity: 0.7;
                }
              }
            }
          }
          .buttonWrapper {
            button {
              all: unset;
            }
            .count {
              text-align: center;
              font-size: 14px;
              letter-spacing: -0.002em;
            }
          }
        `}
      </style>
    </>
  );
};

export default PlayerUI;
