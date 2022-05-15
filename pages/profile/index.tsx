import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import css from 'styled-jsx/css';

import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import useToastMessage from 'hooks/useToastMessage';
import Layout from 'components/Layout';
import { userActions } from 'store/user';
import useUserState from 'hooks/useUserState';

import Button from './Button';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import ConfirmBox from 'components/ConfirmBox';

export const profileWrapper = css`
  .profileWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-top: 30%;
    padding: 0px 32px;
  }
`;

const ProfilePage = () => {
  // useUserTypeRedirect('/', 'guest');
  const { pushToast } = useToastMessage();
  const dispatch = useDispatch();
  const [showConfirm, setConfirm] = useState(false);
  const { user, token } = useUserState();

  const userLogoutRequest = async () => {
    try {
      const res = await axios.post('/api/member/logout', {});
      dispatch(userActions.logout());
    } catch (err) {
      console.error(err);
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
      const res = await axios.post('/api/member/delete', {});
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
      console.log('userLeave');
    } else {
      closeConfirm();
    }
  };

  return (
    <Layout>
      <div className='profileWrapper'>
        <ProfileAvatar avatarSrc={user.avatar} />
        <ProfileInfo name={user.nickName} email={user.email} />
        <div className='buttonWrapper'>
          <Button onClick={onClickProfileEdit} text='프로필 편집' />
          <Button onClick={onClickLogout} text='로그아웃' theme='dark' />
          <Button onClick={onClickUserLeave} text='탈퇴하기' theme='dark' />
        </div>
        <Link href={'/profile/edit'}>프로필 수정</Link>
        <Link href={{ pathname: '/profile/edit', query: { editType: 'signup' } }}>프로필 생성</Link>
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
          .buttonWrapper {
            width: 100%;
          }
        `}
      </style>
    </Layout>
  );
};

export default ProfilePage;
