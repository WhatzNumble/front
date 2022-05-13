import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import Image from 'next/image';

import Layout from 'components/Layout';
import LoginButton from './LoginButton';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import config from 'utils/config';

const LoginPage: NextPage = () => {
  const redirectPath = '/oauth/redirect';
  const redirectURI = `${config.hostURL}${redirectPath}`;
  const backendRequest = `${config.apiBaseURL}/oauth2/authorization/kakao?redirect_uri=${redirectURI}`;
  useUserTypeRedirect('/', 'user');

  return (
    <Layout hasTabBar={false} title='로그인'>
      <div className='loginPage'>
        <div className='info'>
          <Image src='/icon/logo/logo.svg' width={46} height={46} alt='whatz-icon' />
          <div className='infoText'>
            <p>세상의 모든 팁 A to Z</p>
            <p>Whatz A to Z</p>
          </div>
        </div>
        <div className='loginButton'>
          <LoginButton hrefLink={backendRequest} label='카카오톡 로그인하기' />
        </div>
      </div>
      <style jsx>{`
        .loginPage {
          margin: auto;
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        .infoText {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
          p {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 800;
            font-size: 28px;
            height: 36px;
            line-height: 36px;
            margin: 0;
            letter-spacing: -0.02em;
            color: #8c8c8c;
          }
        }
        .loginButton {
          margin-top: 34px;
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
