import Layout from "components/Layout";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  const kakaoClientId = "0559b70272231c0dac4a572620586c54";
  const kakaoRedirectUri = 'http://localhost:3000/auth/callback/kakao';
  const loginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

  return (
    <Layout>
      <>
        <a className='KaKaoLogin' href={"http://localhost:8080/oauth2/authorization/kakao"}>
          카카오 BE 로그인
        </a>
        <a className='KaKaoLogin' href={loginUri}>
          카카오 FE 로그인
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
