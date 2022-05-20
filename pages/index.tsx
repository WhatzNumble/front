import axios from 'axios';
import cookies from 'next-cookies';
import type { NextPage } from 'next';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import config from 'utils/config';
import Layout from 'components/Layout';
import ShortFormPlayer from 'components/ShortFormPlayer';
import { Video } from 'libs/types';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import mockVideos from 'components/ShortFormPlayer/mockVideos';

interface Props {
  videos: Video[];
  likeList: string[];
}

const Home: NextPage<Props> = ({ videos, likeList }) => {
  const dispatch = useDispatch();
  const detectFirstView = () => {
    const localStorageKey = 'onBoarded-Whatz';
    const isOnboared = localStorage.getItem(localStorageKey);
    localStorage.setItem(localStorageKey, 'true');
    return !!isOnboared;
  };

  useEffect(() => {
    if (likeList) {
      dispatch(userActions.updateLikeList({ likeList: likeList }));
    }
  }, [dispatch, likeList]);

  useEffect(() => {
    if (!detectFirstView()) {
      Router.push('/onboarding');
    }
  }, []);

  return (
    <Layout tabBarTransparent>
      {/* <ShortFormPlayer preLoadedVideos={videos || []} query='/home' /> */}
      <ShortFormPlayer preLoadedVideos={mockVideos} query='/home' isEditable />
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
    const res = await axios.get(`${config.apiBaseURL}/home`);
    return {
      props: {
        videos: res.data.videos,
        likeList: res.data.likeList,
      },
    };
  } catch (err) {
    return {
      props: {
        videos: null,
        likeList: null,
      },
    };
  }
};

export default Home;
