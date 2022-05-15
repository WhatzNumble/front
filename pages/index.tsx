import Layout from 'components/Layout';
import axios from 'axios';
import cookies from 'next-cookies';
import type { NextPage } from 'next';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import config from 'utils/config';
import ShortFormPlayer from 'components/ShortFormPlayer';
import mockVideos from 'components/ShortFormPlayer/mockVideos';
import { Video } from 'libs/types';

interface Props {
  videos: Video[];
  likeList: string[];
}

const Home: NextPage<Props> = ({ videos, likeList }) => {
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
    <Layout tabBarTransparent>
      <ShortFormPlayer preLoadedVideos={videos || mockVideos} query='/home' />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);
  const accessTokenByCookie = allCookies[config.cookieAuthHeaderKey];
  if (accessTokenByCookie) {
    axios.defaults.headers.common[config.authHeaderKey] = accessTokenByCookie;
  }
  try {
    const res = await axios.get('/api/home');
    return {
      props: {
        videos: res.data.videos,
        likeList: res.data.likeList,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        videos: null,
        likeList: null,
      },
    };
  }
};

export default Home;
