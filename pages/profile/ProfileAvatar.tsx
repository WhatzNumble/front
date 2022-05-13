import Image from 'next/image';
import { fileLoader } from 'utils/file';

interface Props {
  avatarSrc?: string;
  isEdit?: boolean;
  onProfileChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ProfileAvatar: React.FC<Props> = ({ avatarSrc, isEdit = false, onProfileChange }) => {
  return (
    <>
      <div className='avatarWrapper'>
        {isEdit && onProfileChange ? (
          <>
            <div className='avatar'>
              <Image src={avatarSrc || '/icon/logo/logo.svg'} width={180} height={180} alt='user-avatar' />
              <label className='editButton' htmlFor='profileAvatar'>
                <Image src='/icon/common/btn_edit.svg' layout='fill' alt='edit-button' />
              </label>
              <input
                id='profileAvatar'
                name='profileAvatar'
                type='file'
                className='input'
                onChange={onProfileChange}
                accept='image/*'
                hidden={true}
              />
            </div>
            {/* <input className='input' name='profile' value={avatarSrc} type='hidden' /> */}
          </>
        ) : (
          <div className='avatar'>
            <Image src={avatarSrc || '/icon/logo/logo.svg'} width={180} height={180} alt='user-avatar' />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .avatarWrapper {
            position: relative;
            margin: 0 auto;
          }
          .avatar {
            border-radius: 50%;
            width: 180px;
            height: 180px;
            overflow: hidden;
          }
          .editButton {
            position: absolute;
            bottom: 0px;
            right: 0px;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            background: #ffffff;
          }
        `}
      </style>
    </>
  );
};

export default ProfileAvatar;
