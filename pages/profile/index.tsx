import { useEffect } from 'react';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { userActions } from 'store/user';
import axios from 'axios';

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, userEmail, nickName, userAvatar, token } = useSelector(
    (state: AppState) => state.user
  );

  useEffect(() => {
    console.log(isLoggedIn);
    // if (!isLoggedIn) router.push('/');
  }, [isLoggedIn]);

  const logoutRequest = (token: string) => {
    console.log(token);
    axios
      .get('http://localhost:8080/api/logout', {
        headers: {
          // "X-Auth-Token": token,
          'Access-Control-Allow-Origin': '*',
          'x-auth-token': token,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(userActions.logout());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    logoutRequest(token);
  };

  return (
    <Layout>
      <div>
        user info
        <div>{`email: ${userEmail}`}</div>
        <div>{`nick: ${nickName}`}</div>
        <div>{`avatarSrc: ${userAvatar}`}</div>
      </div>
      <button onClick={() => handleLogout()}>log out</button>
    </Layout>
  );
};

export default ProfilePage;
