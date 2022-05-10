import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import css from 'styled-jsx/css';

import Layout from 'components/Layout';
import { userActions } from 'store/user';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
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
  const dispatch = useDispatch();
  const [showConfirm, setConfirm] = useState(false);
  const { user , token } = useUserState();

  const logoutRequest = async () => {
    await axios
      .post('/member/logout', {
        //post 인데 명세서에 요청 데이터가 없어 일단 비워둠
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onClickLogout = () => {
    logoutRequest();
    dispatch(userActions.logout());
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

  const confirmUserLeave = (confirm: boolean) => {
    //user 탈퇴 request
    if (confirm) {
      console.log('userLeabe');
      dispatch(userActions.logout());
      Router.push('/');
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
          <Button
            onClick={() => {
              Router.push('/profile/edit');
            }}
            text='프로필 편집'
          />
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
