import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'store/user';
import axios from 'axios';
import cookies from 'next-cookies';
import { GetServerSideProps, NextPage } from 'next';
import Layout from 'components/Layout';
import Image from 'next/image';
import Router from 'next/router';

const OauthRedirectPage: NextPage = () => {
  useEffect(() => {
    Router.push('/');
  });

  return (
    <Layout>
      <div className='loading'>
        <Image src='/loading.gif' width={40} height={40} alt='loading' />
      </div>
      <style jsx>
        {`
          .loading {
            margin: auto;
          }
        `}
      </style>
    </Layout>
  );
};

export default OauthRedirectPage;
