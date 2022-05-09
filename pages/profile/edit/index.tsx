import Layout from 'components/Layout';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { AppState } from 'store';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from 'store/ui';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import Button from '../Button';
import ProfileAvatar from '../ProfileAvatar';
import ProfileInfo from '../ProfileInfo';
import { profileWrapper } from '..';
import { HEADER_HEIGHT } from 'components/Layout';

const ProfileEditPage: NextPage = () => {
  const dispatch = useDispatch();
  const { nickName, userAvatar } = useSelector((state: AppState) => state.user);
  const [avatarSrc, setAvatarSrc] = useState<string>(userAvatar);
  const formRef = useRef<HTMLFormElement>(null);

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
      headerRight={<Button onClick={() => handleNext()} width='62px' text='완료' />}
    >
      <form className='profileWrapper' ref={formRef}>
        <ProfileAvatar isEdit  avatarSrc={avatarSrc} />
        <ProfileInfo isEdit name={nickName} />
      </form>
      <style jsx>{profileWrapper}</style>
      <style jsx>
        {`
          .profile {
            margin: 133px 0px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfileEditPage;
