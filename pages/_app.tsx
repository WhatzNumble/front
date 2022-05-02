import App from 'next/app';
import { GetServerSideProps } from 'next';
import type { AppContext, AppProps } from 'next/app';
import { wrapper, AppState } from 'store';
import { useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import cookies from 'next-cookies';
import axios from 'axios';

import Toast from 'components/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  const { toasts } = useSelector((state: AppState) => state.ui);
  // axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.timeout = 10000;

  return (
    <>
      <Component {...pageProps} />

      <TransitionGroup>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} duration={toast.duration} />
        ))}
      </TransitionGroup>

      <style jsx global>{`
        html,
        body {
          overscroll-behavior-y: none;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
        }

        button {
          cursor: pointer;
          border: 0;
        }

        ul,
        li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  const allCookies = cookies(ctx);

  const accessTokenByCookie = allCookies['access-token'];
  if (accessTokenByCookie) {
    axios.defaults.headers.common['x-auth-token'] = accessTokenByCookie;
  }

  const appProps = await App.getInitialProps(context);

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
