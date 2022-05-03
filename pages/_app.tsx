import App from 'next/app';
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
        $color-main: #D8FF69;
        $color-gray: #EFEFEF;

        html,
        body {
          overscroll-behavior-y: none;
          padding: 0;
          margin: 0;
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
          &[class*='theme-'] {
            color: black;
            border-radius: 50px;
            padding: 11px 16px;
            font-size: 16px;
            font-weight: 500;
          }
          &.theme-main {
            background-color: $color-main;
          }
          &.theme-gray {
            background-color: $color-gray;
          }
        }

        ul,
        li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
          font-family: 'Spoqa Han Sans Neo', 'sans-serif';
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

  return { ...appProps, props: accessTokenByCookie };
};

export default wrapper.withRedux(MyApp);
