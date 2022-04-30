import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'store';
import { userActions } from 'store/user';
import axios from 'axios';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import Link from 'next/link';

const ProfilePage = () => {
  useUserTypeRedirect('/', 'guest');
  const dispatch = useDispatch();
  const { userEmail, nickName, userAvatar, token } = useSelector((state: AppState) => state.user);

  const logoutRequest = (token: string) => {
    console.log(token);
    axios
      .post(
        'http://localhost:8080/api/logout',
        {
          //post 인데 명세서에 요청 데이터가 없어 일단 비워둠
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        //로그인 성공시 dispatch
        dispatch(userActions.logout());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    logoutRequest(token);

    //임시로 넣어둠 백엔드 쪽에 로그아웃 로직 구현되면 삭제
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
