/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import RootContext from './rootContext';
import StyleResolver from '../StyleSheet/StyleResolver';
import StyleSheet from '../StyleSheet';
import View from '../View';

type Props = {
  WrapperComponent?: ?React.ComponentType<*>,
  // $FlowFixMe
  children?: React.Children,
  rootTag: any,
  styleResolver: typeof StyleResolver
};

export default function AppContainer(props: Props): React.Node {
  const { children, WrapperComponent } = props;

  let innerView = (
    <View children={children} key={1} pointerEvents="box-none" style={styles.appContainer} />
  );

  if (WrapperComponent) {
    innerView = <WrapperComponent>{innerView}</WrapperComponent>;
  }
  const rootContext = { rootTag: props.rootTag, styleResolver: props.styleResolver };
  return (
    <RootContext.Provider value={rootContext}>
      <View pointerEvents="box-none" style={styles.appContainer}>
        {innerView}
      </View>
    </RootContext.Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});
