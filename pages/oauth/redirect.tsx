import { useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import { useRouter } from 'next/router';

const OauthRedirectPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query; // redirect uri의 쿼리스트링에 있는 access token

  useEffect(() => {
    if (typeof token === 'string') {
      dispatch(userActions.setToken({ token: token }));
    }
  }, []);
  return <div>Loading...</div>;
};

export default OauthRedirectPage;
