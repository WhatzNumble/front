import { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { AppState } from 'store';

import Layout from 'components/Layout';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const redirectUri = 'http://localhost:3000/oauth/redirect';
  const backendRequest = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
  const { isLoggedIn } = useSelector((state: AppState) => state.user);


  //logout action 추가시 사용
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <>
        <a className='KaKaoLogin' href={backendRequest}>
          카카오 로그인
        </a>
        <style jsx>
          {`
            .KaKaoLogin {
              border-radius: 12px;
              background-color: #fee500;
              color: #000000;
              height: fit-content;
              padding: 1rem;
            }
          `}
        </style>
      </>
    </Layout>
  );
};

export default LoginPage;
