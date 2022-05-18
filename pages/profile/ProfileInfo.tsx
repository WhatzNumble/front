interface Props {
  isEdit?: boolean;
  email?: string;
  onNickNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const ProfileInfo: React.FC<Props> = ({ name, isEdit = false, email, onNickNameChange }) => {
  return (
    <div className='profileInfo'>
      {isEdit && onNickNameChange ? (
        <>
          <input name='nickName' className='nickName' onChange={onNickNameChange} value={name} />
          <p className='info'>
            사용하고자 하는 닉네임을 입력해주세요 <br />
            Whatz에 표시되는 이름입니다
          </p>
        </>
      ) : (
        <>
          <div className='nickName'>{name}</div>
          <p className='email'>{email}</p>
        </>
      )}
      <style jsx>
        {`
          .profileInfo {
            color: var(--white);
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
              color: var(--gray-2);
              margin: 0;
            }
            .nickName {
              background-color: transparent;
              width: 315px;
              font-family: 'Apple SD Gothic Neo';
              font-style: normal;
              font-weight: 800;
              font-size: 40px;
              line-height: 40px;
              /* identical to box height, or 100% */
              text-align: center;
              letter-spacing: -0.3px;
              color: #fff;
              /* wirefram */
            }
            input {
              border: 0;
              border-bottom: 2px solid #8f8f8f;
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
