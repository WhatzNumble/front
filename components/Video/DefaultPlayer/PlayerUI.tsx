import ProgressBar from './ProgressBar';
import Avatar from './Avatar';
import Image from 'next/image';

type UserProfile = {
  name: string;
  avatar: string;
  id: string;
};

interface Props {
  title: string;
  likeCount: number;
  like: boolean;
  view: number;
  date: string;
  // userProfile: UserProfile;
  muted: boolean;
  showDetail: boolean;
  detailInfo: string;
  progress?: number;
  handleToggle: (input: string) => void;
}

const PlayerUI: React.FC<Props> = ({
  muted,
  view,
  date,
  title,
  likeCount,
  like,
  progress,
  handleToggle,
  showDetail,
  detailInfo,
}) => {
  return (
    <>
      <div className='PlayerUI'>
        <div className='leftWrapper'>
          <div className='detailWrapper'>
            <div className={showDetail ? 'detail' : 'hidden_detail'}>{detailInfo}</div>
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
            <button onClick={() => handleToggle('detail')}>
              <Image src={'/more_button.svg'} width={32} height={32} alt='bookmark' />
            </button>
          </div>
          <div className='button'>
            <button onClick={() => handleToggle('like')}>
              <Image
                src={like ? '/bookmark_selected.svg' : '/bookmark.svg'}
                width={32}
                height={32}
                alt='bookmark'
              />
            </button>
            <div className='count'>{likeCount} </div>
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
            position: absolute;
            bottom: 0px;
            margin: 0 24px 24px 24px;
            width: calc(100% - 48px);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }

          .leftWrapper {
            max-width: 80%;
            .detailWrapper {
              font-weight: 500;
              font-size: 14px;
              line-height: 140%;
              /* identical to box height, or 20px */
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
          }
        `}
      </style>
    </>
  );
};

export default PlayerUI;
