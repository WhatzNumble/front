import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import css from 'styled-jsx/css';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import useToastMessage from 'hooks/useToastMessage';
import Layout from 'components/Layout';
import { userActions } from 'store/user';
import useUserState from 'hooks/useUserState';

import Button from 'components/Button';
import ConfirmBox from 'components/ConfirmBox';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';

export const profileWrapper = css`
  .profileWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: auto 0px;
    padding: 0px 32px;
  }
`;

const ProfilePage = () => {
  useUserTypeRedirect('/', 'guest');
  const { pushToast } = useToastMessage();
  const dispatch = useDispatch();
  const [showConfirm, setConfirm] = useState(false);
  const { user } = useUserState();

  const userLogoutRequest = async () => {
    try {
      const res = await axios.post('/member/logout', {});
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(userActions.logout());
    }
  };

  const onClickProfileEdit = () => {
    Router.push('/profile/edit');
  };

  const onClickLogout = () => {
    userLogoutRequest();
  };

  const openConfirm = () => {
    setConfirm(true);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };

  const onClickUserLeave = () => {
    openConfirm();
    //user 탈퇴 request
  };

  const userDeleteRequest = async () => {
    try {
      const res = await axios.post('/member/delete', {});
      pushToast('탈퇴하였습니다');
      dispatch(userActions.logout());
      Router.push('/');
    } catch (err) {
      pushToast('ServerError: 탈퇴에 실패했습니다. 로그아웃 합니다.');
      console.error(err);
    }
  };

  const confirmUserLeave = (confirm: boolean) => {
    //user 탈퇴 request
    if (confirm) {
      userDeleteRequest();
    } else {
      closeConfirm();
    }
  };

  return (
    <Layout title='프로필' headerTitle='프로필'>
      <div className='profileWrapper'>
        <ProfileAvatar avatarSrc={user.avatar} />
        <div className='profileInfo'>
          <ProfileInfo name={user.nickName} email={user.email} />
        </div>
        <div className='buttonWrapper'>
          <Button
            onClick={onClickProfileEdit}
            buttonColor='var(--primary)'
            textColor='var(--black)'
            border='none'
            text='프로필 수정하기'
          />
          <Button onClick={onClickLogout} text='로그아웃' />
          <Button
            onClick={onClickUserLeave}
            border='none'
            textColor='var(--gray-2)'
            text='탈퇴하기'
          />
        </div>
        <ConfirmBox
          show={showConfirm}
          callback={confirmUserLeave}
          message='정말로 탈퇴하시겠습니까?'
        />
      </div>
      <style jsx>{profileWrapper}</style>
      <style jsx>
        {`
          .avatar {
            display: flex;
            justify-content: center;
          }
          .profileInfo {
            margin-top: 30px;
          }
          .buttonWrapper {
            margin-top: 59px;
            width: 100%;
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfilePage;
