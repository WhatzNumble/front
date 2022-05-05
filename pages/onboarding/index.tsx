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
        <Image src='/logo_with_title.svg' width={180} height={40.15} alt='whatz-logo' />
      </div>
      <style jsx>
        {`
          .logoContainer {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </Layout>
  );
};

export default OnBoardingPage;
