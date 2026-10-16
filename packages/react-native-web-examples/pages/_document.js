import { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

export default function MyDocument() {
  return (
    <Html>
      <Head />
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
