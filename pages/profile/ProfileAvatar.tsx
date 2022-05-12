import Image from 'next/image';

interface Props {
  avatarSrc?: string;
  isEdit?: boolean;
}

const ProfileAvatar: React.FC<Props> = ({ avatarSrc, isEdit = false }) => {
  return (
    <>
      <div className='avatarWrapper'>
        <div className='avatar'>
          <Image src={avatarSrc || '/logo.svg'} width={180} height={180} alt='user-avatar' />
        </div>
        {isEdit && (
          <>
            <label className='editButton' htmlFor='profileUpload'>
              <Image src='/btn_edit.svg' layout='fill' alt='edit-button' />
            </label>
            <input className='input' name='profileUpload' accept='image/*' type='hidden' />
            <input className='input' name='thumbnailName' value={avatarSrc} type='hidden' />
          </>
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
