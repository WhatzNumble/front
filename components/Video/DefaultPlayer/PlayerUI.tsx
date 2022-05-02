import ProgressBar from "./ProgressBar";

type UserProfile = {
  name: string;
  avatar: string;
  id: string;
};

interface Props {
  title: string;
  likeCount: number;
  like: boolean;
  // userProfile: UserProfile;
  muted: boolean;
  detail: boolean;
  detailInfo: string;
  progress: number;
  handleToggle: (input: string) => void;
}

const PlayerUI: React.FC<Props> = ({
  muted,
  title,
  likeCount,
  like,
  progress,
  handleToggle,
  detail,
  detailInfo,
}) => {
  return (
    <>
      <div className='PlayerUI'>
        <div className='Top'>
          <div className='MuteButton' onClick={() => handleToggle("mute")}>
            {muted ? "unmute" : "mute"}
          </div>
        </div>
        <div className='Bottom'>
          <div className='Title'>{title}</div>
        </div>
        <div className='Side'>
          <div className='ICon' onClick={() => handleToggle("like")}>
            {like ? "dislike" : "like"}
            <label className='label'>{likeCount} </label>
          </div>
          <div className='Icon' onClick={() => handleToggle("detail")}>
            detail
          </div>
        </div>
        {detail && (
          <div className='Detail' onClick={() => handleToggle("detail")}>
            {detailInfo}
          </div>
        )}
        {/* <ProgressBar progress={progress} /> */}
      </div>
      <style jsx>
        {`
          * {
            color: white;
          }
          .Top {
            position: absolute;
            min-width: fit-content;
            top: 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .MuteButton {
              position: absolute;
              right: 1rem;
              padding: 10px;
            }
          }
          .Bottom {
            display: flex;
            position: absolute;
            flex-direction: column;
            bottom: 10px;
          }
          .Side {
            position: absolute;
            right: 10px;
            bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .Icon {
              margin: 1rem;
            }
          }
          .Detail {
            width: 100%;
            position: absolute;
            flex-direction: column;
            bottom: 10px;
            background: grey;
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
};

export default PlayerUI;
