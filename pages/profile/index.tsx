import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';

import Layout from 'components/Layout';
import { userActions } from 'store/user';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import { deleteCookie } from 'utils';
import useUserState from 'hooks/useUserState';

const ProfilePage = () => {
  useUserTypeRedirect('/', 'guest');
  const dispatch = useDispatch();
  const { userEmail, nickName, userAvatar, token } = useUserState();

  const logoutRequest = () => {
    console.log(token);
    axios
      .post('/api/logout', {
        //post 인데 명세서에 요청 데이터가 없어 일단 비워둠
      })
      .then((response) => {
        console.log(response);
        //로그인 성공시 dispatch
        axios.defaults.headers.common['x-auth-token'] = '';
        dispatch(userActions.logout());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    deleteCookie('access-token', '/', 'localhost');
    logoutRequest();
    Router.push('/');
    dispatch(userActions.logout());
  };

  return (
    <Layout>
      <div>
        user info // 리덕스 login action 에 지정된 데이터 ,ap login response 데이터 준비되면 수정
        <div>{`email: ${userEmail}`}</div>
        <div>{`nick: ${nickName}`}</div>
        <div>{`avatarSrc: ${userAvatar}`}</div>
      </div>
      <Link href={'/profile/edit'}>프로필 수정</Link>
      <Link href={{ pathname: '/profile/edit', query: { editType: 'signup' } }}>프로필 생성</Link>
      <button onClick={() => handleLogout()}>log out</button>
    </Layout>
  );
};

export default ProfilePage;
