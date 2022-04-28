import Layout from 'components/Layout';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
  const redirectUri = 'http://localhost:3000/oauth/redirect';
  const backendRequest = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;

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
