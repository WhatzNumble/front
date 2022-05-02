import Layout from 'components/Layout';
import axios from 'axios';
import cookies from 'next-cookies';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import useUserState from 'hooks/useUserState';

import { userActions } from 'store/user';

interface Props {
  token: string | null;
}

const Home: NextPage<Props> = ({ token }) => {
  const { isLoggedIn } = useUserState();
  const dispatch = useDispatch();
  const detectFirstView = () => {
    const localStorageKey = 'onBoarded-Whatz';
    const isOnboared = localStorage.getItem(localStorageKey);
    localStorage.setItem(localStorageKey, 'true');
    return !!isOnboared;
  };

  useEffect(() => {
    if (!detectFirstView()) {
      Router.push('/onboarding');
    }
  }, []);

  useEffect(() => {
    if (token && !isLoggedIn) {
      console.log('login');
      const response = axios.get('/get/user');
      dispatch(userActions.login({ token: token, socialType: 'kakao' }));
      console.log(response);
    }
  }, [token, dispatch, isLoggedIn]);

  return (
    <Layout title='홈'>
      <div>홈</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);

  const accessTokenByCookie = allCookies['access-token'];
  if (accessTokenByCookie) {
    axios.defaults.headers.common['x-auth-token'] = accessTokenByCookie;
  }

  return {
    props: {
      token: accessTokenByCookie || null,
    },
  };
};

export default Home;
