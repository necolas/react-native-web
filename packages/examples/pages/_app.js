import * as React from 'react';
import { ReactRootView } from 'react-native-web';

export default function Application({ Component, pageProps }) {
  return <ReactRootView>{<Component {...pageProps} />}</ReactRootView>;
}
