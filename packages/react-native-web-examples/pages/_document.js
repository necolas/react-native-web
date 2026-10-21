import { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

const style = `
body,html,#__next{height:100%}
body{overflow:hidden}
#__next{display:flex;flex-direction:column}
`.trim();

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <style>{style}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const { renderPage } = ctx;
  AppRegistry.registerComponent('rn', () => Main);
  const { getStyleElement } = AppRegistry.getApplication('rn');
  const page = await renderPage();
  const styles = getStyleElement();
  return { ...page, styles };
};
