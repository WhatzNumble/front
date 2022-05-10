import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import axios from 'axios';
import cookies from 'next-cookies';
import { GetServerSideProps, NextPage } from 'next';

import config from 'utils/config';
import Router from 'next/router';

const OauthRedirectPage: NextPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(token);
  //   if (typeof token === 'string') {
  //     const response = axios.get('/get/user');
  //     dispatch(userActions.login({ token: token, socialType: 'kakao' }));
  //     console.log(response);
  //   }
  // }, [token, dispatch]);
  useEffect(() => {
    Router.push('/');
  });

  return <div>Loading...</div>;
};

export default OauthRedirectPage;
