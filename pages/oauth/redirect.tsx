import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'store/user';
import { useRouter } from 'next/router';
import { AppState } from 'store';
import axios from 'axios';

const OauthRedirectPage = () => {
  const router = useRouter();
  const { token } = router.query; // redirect uri의 쿼리스트링에 있는 access token
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    console.log(token);
    if (typeof token === 'string') {
      dispatch(userActions.login({ token: token, socialType: 'kakao' }));
      const response = axios.get('http://localhost:8080/get/user', {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log(response);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      Loading...
      TODO
      cookie 로직으로 수정 
    </div>
  );
};

export default OauthRedirectPage;
