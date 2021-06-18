import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KTNPKR6NMT');
        `
      };
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
           <link rel="stylesheet"
           href="/static/css/styles.css"/>
         <script async src="https://www.googletagmanager.com/gtag/js?id=G-KTNPKR6NMT"></script>
         <script dangerouslySetInnerHTML={this.setGoogleTags()} />
                </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;