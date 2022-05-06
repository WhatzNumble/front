import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import css from 'styled-jsx/css';

import Layout from 'components/Layout';
import { userActions } from 'store/user';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import { deleteCookie } from 'utils';
import useUserState from 'hooks/useUserState';

import ProfileAvatar from './ProfileAvatar';

const profileWrapper = css`
  .profileWrapper {
    margin-top: 168px;
  }
`;

const ProfilePage = () => {
  // useUserTypeRedirect('/', 'guest');
  const dispatch = useDispatch();
  const { userEmail, nickName, userAvatar, token } = useUserState();

  const logoutRequest = () => {
    console.log(token);
    axios
      .post('/member/logout', {
        //post 인데 명세서에 요청 데이터가 없어 일단 비워둠
      })
      .then((response) => {
        console.log(response.data);
        //로그아웃 성공시 dispatch
        axios.defaults.headers.common['x-auth-token'] = '';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    logoutRequest();
    deleteCookie('access-token', '/');
    dispatch(userActions.logout());
    Router.push('/');
  };

  return (
    <Layout>
      <div className='profileWrapper'>
        <div className='avatar'>
          <ProfileAvatar avatarSrc={userAvatar} />
        </div>
        <div>{`email: ${userEmail}`}</div>
        <div>{`nick: ${nickName}`}</div>
        <Link href={'/profile/edit'}>프로필 수정</Link>
        <Link href={{ pathname: '/profile/edit', query: { editType: 'signup' } }}>프로필 생성</Link>
        <button onClick={() => handleLogout()}>log out</button>
      </div>
      <style jsx>{profileWrapper}</style>
      <style jsx>
        {`
        .avatar{
          display: flex;
          justify-content: center;
        }
          
        `}

      </style>
    </Layout>
  );
};

export default ProfilePage;
