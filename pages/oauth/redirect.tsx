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
      const response = axios.get('http://localhost:8080/get/user');
      console.log(response)
    }
  }, [token]);

  useEffect(() => {
    if(isLoggedIn){
      router.push('/');
    }
  }, [isLoggedIn]);

  return <div>Loading...
    kakao 로그인 한 상태에서 다시 로그인 요청시 redirect uri query값에 token 오지 않음.
    임시로 브라우저 url 입력창에 ?token=cookie access code 입력 해야 클라이언트 측에서 로그인 로직 동작
  </div>;
};

export default OauthRedirectPage;
