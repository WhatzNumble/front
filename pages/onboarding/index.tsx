import { useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Image from 'next/image';
import Layout from 'components/Layout';

const OnBoardingPage: NextPage = () => {
  const redirectSecond = 3;

  useEffect(() => {
    setTimeout(() => {
      Router.push('/');
    }, redirectSecond * 1000);
  }, []);

  return (
    <Layout hasTabBar={false}>
      <div className='logoContainer'>
        <Image src='/logo.svg' width={44.54} height={40.15} alt='whatz-icon' />
        <Image src='/whatz.svg' width={114.46} height={25.63} alt='whatz-logo' />
      </div>
      <style jsx>
        {`
          .logoContainer {
            position: absolute;
            width: 180px;
            height: 40px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: space-around;
          }
        `}
      </style>
    </Layout>
  );
};

export default OnBoardingPage;
