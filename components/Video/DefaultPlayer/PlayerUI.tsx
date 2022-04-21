import React from "react";

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
  handleMute: () => void;
  handleLike: () => void;
}

const PlayerUI: React.FC<Props> = ({ muted, title, likeCount, like, handleMute, handleLike}) => {
  return (
    <>
      <div className='PlayerUI'>
        <div className='Top'>
          <div className='MuteButton' onClick={handleMute}>
            {muted ? "unmute" : "mute"}
          </div>
        </div>
        <div className='Bottom'>
          <div className='Title'>{title}</div>
        </div>
        <div className='Side'>
          <div className='ICon' onClick={handleLike}>{like? 'dislike' : 'like' }
          </div>
          <label className='label'>{likeCount} </label>
        </div>
      </div>
      <style jsx>
        {`
          *{ 
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
          }
        `}
      </style>
    </>
  );
};

export default PlayerUI;
