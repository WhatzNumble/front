import { NextPage } from 'next';
import Image from 'next/image';

import Layout from 'components/Layout';
import LoginButton from './LoginButton';
import Button from 'components/Button';
import useUserTypeRedirect from 'hooks/useUserTypeRedirect';
import config from 'utils/config';

const LoginPage: NextPage = () => {
  const redirectPath = '/oauth/redirect';
  const isProd = process.env.NODE_ENV === 'production';

  const redirectURI = `${config.hostURL}${redirectPath}`;
  const backendRequest = isProd
    ? `/oauth2/authorization/kakao?redirect_uri=${redirectURI}`
    : `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=${redirectURI}`;
  useUserTypeRedirect('/', 'user');

  return (
    <Layout hasTabBar={false} title='로그인' isGradient>
      <div className='loginPage'>
        <div className='logoWrapper'>
          <div className='section'>
            <Image src='/icon/logo/logo_with_title.svg' width={90} height={20} alt='whatz-icon' />
          </div>
          <div className='section'>
            <div className='infoText'>
              <p>세상의 모든 팁</p>
              <p>A to Z</p>
            </div>
          </div>
          <LoginButton
            logoSrc='/icon/common/kakao.svg'
            hrefLink={backendRequest}
            backgroundColor='#FEE500'
            text='카카오톡 로그인하기'
          />
        </div>
      </div>
      <style jsx>{`
        .loginPage {
          margin: auto 20px;
          width: calc(100% - 40px);
          .logoWrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            .section {
              margin-bottom: 56px;
            }
          }
        }
        .infoText {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--white);
          p {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 800;
            font-size: 28px;
            height: 36px;
            line-height: 36px;
            margin: 0;
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
