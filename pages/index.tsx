import Layout from 'components/Layout';
import axios from 'axios';
import cookies from 'next-cookies';
import type { NextPage } from 'next';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import config from 'utils/config';

interface Props {
  token: string | null;
}

const Home: NextPage<Props> = ({ token }) => {
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

  return (
    <Layout title='홈'>
      <div>홈</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);

  const accessTokenByCookie = allCookies[config.cookieAuthHeaderKey];
  if (accessTokenByCookie) {
    axios.defaults.headers.common[config.authHeaderKey] = accessTokenByCookie;
  }

  return {
    props: {
      token: accessTokenByCookie || null,
    },
  };
};

export default Home;
