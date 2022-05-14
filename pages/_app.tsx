import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { wrapper, AppState } from 'store';
import { useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import axios from 'axios';

import * as ga from 'libs/ga';
import config from 'utils/config';
import Toast from 'components/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  const { toasts } = useSelector((state: AppState) => state.ui);
  const router = useRouter();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = config.apiBaseURL;
    axios.defaults.timeout = 10000;
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />

      <TransitionGroup>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} duration={toast.duration} />
        ))}
      </TransitionGroup>

      <style jsx global>{`
        :root {
          --color-main: #d8ff69;
          --color-gray: #efefef;
          --primary: #70FF00;
          --primary-light: #e8ffa7;
          --primary-dark: #abe700;
          --black: #000000;
          --gray-1: #B8B8B8;
          --gray-2: #8F8F8F;
          --gray-3: #4D4D4D;
          --gray-4: #2C2C2C;
          --error: #ff0000;
          --positive: #00f0ff;
          --warning: #faff00;
          --white: #ffffff;
        }

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
            color: var(--black);;
            border-radius: 50px;
            padding: 11px 16px;
            font-size: 16px;
            font-weight: 500;
          }
          &.theme-main {
            background-color: var(--primary);
          }
          &.theme-gray {
            background-color: var(--color-gray);
            color: var(--gray-3);
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

        .image-cover {
          img {
            object-fit: cover;
          }
        }

        .image-contain {
          img {
            object-fit: contain;
          }
        }
      `}</style>
    </>
  );
}

export default wrapper.withRedux(MyApp);
