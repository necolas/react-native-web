import React from 'react';

import AppContainer from 'react-native-web/dist/cjs/exports/AppRegistry/AppContainer';

export default function Application({ Component, pageProps }) {
  return <AppContainer WrapperComponent={Component} WrapperComponentProps={pageProps} />;
}
