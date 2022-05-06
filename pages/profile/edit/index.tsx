import Layout from 'components/Layout';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from 'store/ui';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import { userActions } from 'store/user';
import Button from '../Button';
import ProfileAvatar from '../ProfileAvatar';
import ProfileInfo from '../ProfileInfo';

const ProfileEditPage: NextPage = () => {
  const dispatch = useDispatch();
  const {nickName, userEmail, userAvatar}= useSelector((state: AppState) => state.user);
  const [avatarSrc, setAvatarSrc] = useState<string>(userAvatar);

  const { editType } = useRouter().query;
  const isSignUp = editType === 'signup';

  // useUserTypeRedirect('/', 'guest'); //guest 일 경우 홈으로 redirect


  const successUpdateProfile = () => {
    //dispatch(userActions.loadUser(response));
    Router.push(isSignUp ? '/' : '/profile');
    dispatch(
      uiActions.pushToast({
        message: isSignUp ? '프로필이 생성되었습니다' : '프로필이 수정되었습니다',
      })
    );
  };

  const failUpdateProfile = () => {
    Router.push('/');
    dispatch(
      uiActions.pushToast({
        message: '프로필 수정 실패 ',
      })
    );
  };

  const handleNext = () => {
    //SUBMIT REQUEST

    //ONSUCCESS
    successUpdateProfile();

    //ON FALSE
  };

  return (
    <Layout
      headerLeft={<div>취소</div>}
      headerTitle={isSignUp ? '프로필 생성하기' : '프로필 수정하기'}
      headerRight={<Button onClick={() => handleNext()} width='62px' text='완료'/>}
    >
      <div className='profile'>
        <ProfileAvatar avatarSrc={avatarSrc} />
        <ProfileInfo isEdit name={nickName} />
      </div>
      <style jsx>
        {`
          .profile {
            margin: 133px 0px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .avatar {
              border-radius: 50%;
              width: 180px;
              height: 180px;
              .editButton {
                position: absolute;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                left: 234px;
                top: 304px;
                background: #ffffff;
              }
            }
            
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfileEditPage;
