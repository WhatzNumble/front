import Document, { Html, Head, Main, NextScript } from 'next/document';
import config from 'utils/config';

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/favicon.svg' />
          <link
            href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
            rel='stylesheet'
            type='text/css'
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.gaTrackingID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.gaTrackingID}', {
          page_path: window.location.pathname,
        });
      `,
            }}
          />
        </Head>

        <body>
          <div id='modal-root'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
