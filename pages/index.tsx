import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const detectFirstView = () => {
    const localStorageKey = 'onBoarded-Whatz'
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

export default Home;
