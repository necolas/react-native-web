import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    AppRegistry.registerComponent('rn', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('rn');
    const page = await renderPage();
    const styles = getStyleElement();
    return { ...page, styles };
  }

  render() {
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
}
