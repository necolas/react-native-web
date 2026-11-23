/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import type { HostNode, Nullable } from '../../types';
import StyleSheet from '../StyleSheet';
import View from '../View';

type Props = {
  WrapperComponent?: Nullable<
    React.ComponentType<{ children: React.ReactNode }>
  >;
  children?: React.ReactNode;
  ref?: React.Ref<HostNode>;
  rootTag: HTMLElement | {};
};

const RootTagContext: React.Context<HTMLElement | {} | null> =
  React.createContext<HTMLElement | {} | null>(null);

const AppContainer = (props: Props): React.ReactNode => {
  const { children, ref, WrapperComponent } = props;

  let innerView = (
    <View children={children} key={1} style={styles.appContainer} />
  );

  if (WrapperComponent) {
    innerView = <WrapperComponent>{innerView}</WrapperComponent>;
  }

  return (
    <RootTagContext.Provider value={props.rootTag}>
      <View ref={ref} style={styles.appContainer}>
        {innerView}
      </View>
    </RootTagContext.Provider>
  );
};

AppContainer.displayName = 'AppContainer';

export default AppContainer;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    pointerEvents: 'box-none'
  }
});
