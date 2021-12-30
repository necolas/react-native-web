import * as React from 'react';

import StyleSheetManager from 'react-native-web/dist/cjs/exports/StyleSheet/StyleSheetManager';

export default function Application({ Component, pageProps }) {
  return <StyleSheetManager>{<Component {...pageProps} />}</StyleSheetManager>;
}
