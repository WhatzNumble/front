import { useState } from 'react';
import Image from 'next/image';

import { editableVideo } from 'libs/types';
import { dateToDateFormatString } from 'utils/dateParser';
import PopBox from 'components/PopBox';

import Avatar from './Avatar';
import Content from './Content';
import EditPopup from './EditPopup';
import ProgressBar from './ProgressBar';

interface Props extends editableVideo {
  muted?: boolean;
  progress?: number;
}

const PlayerUI: React.FC<Props> = ({ video, isEditable, progress }) => {
  const {
    profile,
    videoTitle,
    videoViews,
    videoCreationDate,
    videoLike,
    videoContent,
    videoId,
    embedLink,
  } = video;
  const [isLike, setIsLike] = useState(false);
  const [showPop, setShowPop] = useState(false);

  const toggleVideoEditPop = () => {
    setShowPop((prev) => !prev);
  };

  const handleLike = () => {
    setIsLike((prev) => !prev);
  };

  const onClickMore = () => {};

  return (
    <>
      <div className='PlayerUI'>
        <div className='row top'>
          <div className='contentWrapper'>
            <Content content={videoContent} />
          </div>
          {isEditable && (
            <div className='button'>
              <button onClick={() => toggleVideoEditPop()}>
                <Image src={'/icon/player/more_button.svg'} width={32} height={32} alt='bookmark' />
              </button>
            </div>
          )}
        </div>
        <div className='row'>
          <Avatar link='test' avatarImage={profile || '/mock/profile.png'} />
          <div className='infoWrapper'>
            <div className='info'>
              <div className='title'>{videoTitle}</div>
              <div className='viewDate'>
                {`조회수 ${videoViews}`}&#183;{dateToDateFormatString(videoCreationDate)}
              </div>
            </div>
          </div>
          <div className='button'>
            <button onClick={() => handleLike()}>
              <Image
                src={isLike ? '/icon/player/bookmarked.svg' : '/icon/player/bookmark.svg'}
                width={32}
                height={32}
                alt='bookmark'
              />
              <div className='count' style={isLike ? { opacity: 1 } : { opacity: 0.5 }}>
                {videoLike}
              </div>
            </button>

            <PopBox show={showPop} onClosePopBox={toggleVideoEditPop}>
              <EditPopup videoId={videoId} isEmbed={!!embedLink} />
            </PopBox>
          </div>
        </div>
        {!!progress && <ProgressBar progress={progress} />}
      </div>
      <style jsx>
        {`
          .PlayerUI {
            z-index: 10;
            padding: 0 20px;
            position: absolute;
            bottom: 0px;
            width: 100%;
            display: flex;
            flex-direction: column;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0.01) 100%);
            color: var(--white);
          }
          .row {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 0 12px;
          }
          .top {
            align-items: flex-end;

          }

          .infoWrapper {
            flex: 1;
            .info {
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

          .contentWrapper {
            flex:1;
            width: 80%;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            display: flex;
            align-items: flex-end;
            letter-spacing: -0.002em;
            .content {
              overflow: scroll;
              height: 260px;
            }
            .hidden_content {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .button {
            button {
              width: 40px;
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
