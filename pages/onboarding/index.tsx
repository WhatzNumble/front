import { useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Image from 'next/image';

const onBoardingPage: NextPage = () => {
  // const redirectSecond = 3;

  // useEffect(() => {
  //   setTimeout(() => {
  //     Router.push('/');
  //   }, redirectSecond * 1000);
  // }, [redirectSecond]);

  return (
    <div className='onBoardPage'>
      <div className='logoContainer'>
        <Image src='/logo.svg' width={44.54} height={40.15} className='logo' alt='whatz-logo' />
        <Image src='/whatz.svg' width={114.46} height={25.63} className='whatz' alt='whatz-logo' />
      </div>
      <style jsx>
        {`
          .logo {
            position: absolute;
            left: 98px;
            top: 386px;
          }
          .whatz {
            position: absolute;
            width: 114.46px;
            height: 25.63px;
            left: 151.54px;
            top: 393.25px;
          }

          .logoContainer {
            position: absolute;
            width: 180px;
            height: 40px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .onBoardPage {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

export default onBoardingPage;
