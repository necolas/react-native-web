/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ComponentType } from 'react';

import StyleSheet from '../StyleSheet';
import View from '../View';
import { any } from 'prop-types';
import React from 'react';

type Context = {
  rootTag: any
};

type Props = {
  WrapperComponent?: ?ComponentType<*>,
  // $FlowFixMe
  children?: React.Children,
  rootTag: any
};

type State = {
  mainKey: number
};

export default class AppContainer extends React.Component<Props, State> {
  state = { mainKey: 1 };

  static childContextTypes = {
    rootTag: any
  };

  getChildContext(): Context {
    return {
      rootTag: this.props.rootTag
    };
  }

  render() {
    const { children, WrapperComponent } = this.props;
    let innerView = (
      <View
        children={children}
        key={this.state.mainKey}
        pointerEvents="box-none"
        style={styles.appContainer}
      />
    );

    if (WrapperComponent) {
      innerView = <WrapperComponent>{innerView}</WrapperComponent>;
    }

    return (
      <View pointerEvents="box-none" style={styles.appContainer}>
        {innerView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});
