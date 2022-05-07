import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import axios from 'axios';
import cookies from 'next-cookies';
import { GetServerSideProps, NextPage } from 'next';

import config from 'utils/config';

interface Props {
  token: string;
}

const OauthRedirectPage: NextPage<Props> = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(token);
    if (typeof token === 'string') {
      const response = axios.get('/get/user');
      dispatch(userActions.login({ token: token, socialType: 'kakao' }));
      console.log(response);
    }
  }, [token, dispatch]);

  return <div>Loading...</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allCookies = cookies(context);

  const accessTokenByCookie = allCookies[config.cookieAuthHeaderKey];
  if (accessTokenByCookie) {
    axios.defaults.headers.common[config.authHeaderKey] = accessTokenByCookie;
  }

  return {
    props: {
      token: accessTokenByCookie,
    },
  };
};

export default OauthRedirectPage;
