import { useState } from 'react';

interface Props {
  isEdit?: boolean;
  email?: string;
  name: string;
}

const ProfileInfo: React.FC<Props> = ({ name, isEdit = true, email }) => {
  const [nickName, setNickName] = useState<string>(name);

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <div className='profileInfo'>
      {isEdit ? (
        <>
          <input className='nickName' onChange={handleNickName} value={nickName} />
          <p className='info'>
            사용하고자 하는 닉네임을 입력해주세요 <br />
            Whatz에 표시되는 이름입니다
          </p>
        </>
      ) : (
        <>
          <div className='nickName'>{nickName}</div>
          <p className='email'>{email}</p>
        </>
      )}
      <style jsx>
        {`
          .profileInfo {
            margin-top: 48px;
            color: #fff;
            p {
              color: #8f8f8f;
            }
            .nickName {
              border: 0;
              border-bottom: 2px solid #8f8f8f;
              width: 315px;
              font-family: 'Apple SD Gothic Neo';
              font-style: normal;
              font-weight: 800;
              font-size: 40px;
              line-height: 40px;
              /* identical to box height, or 100% */
              text-align: center;
              letter-spacing: -0.3px;
              /* wirefram */
              color: #565656;
              &:focus {
                outline: none;
              }
            }
            .info {
              font-family: 'Apple SD Gothic Neo';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              /* or 150% */
              text-align: center;
              letter-spacing: -0.3px;
              /* wirefram_light */
              color: #8c8c8c;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProfileInfo;
