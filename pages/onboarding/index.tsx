import { useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Image from 'next/image';

const onBoardingPage: NextPage = () => {
  const redirectSecond = 2;

  useEffect(() => {
    setTimeout(() => {
      Router.push('/');
    }, redirectSecond * 1000);
  }, [redirectSecond]);

  return (
    <div>
      <div className='logoContainer'>
        <Image src='/logo.svg' height={30} width={30} alt='whatz-logo' />
      </div>
      <style jsx>
        {`
          .logoContainer {
            position: absolute;
            width: 180px;
            height: 40.15px;
            left: 98px;
            top: 386px;
          }
        `}
      </style>
    </div>
  );
};

export default onBoardingPage;
