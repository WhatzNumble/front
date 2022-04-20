import Toast from 'components/Toast';
import type { AppProps } from 'next/app'
import { wrapper } from 'store'
Toast

function MyApp({ Component, pageProps }: AppProps) {
  return <>
      <Component {...pageProps} />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h1,h2,h3,h4,h5,h6 {
          margin: 0;
        }

        button {
          cursor: pointer;
          border: 0;
        }

        ul,li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

      `}</style>
    </>
}

export default wrapper.withRedux(MyApp);
