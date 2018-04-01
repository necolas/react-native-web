/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import StyleSheet from '../StyleSheet';
import View from '../View';
import { any, node } from 'prop-types';
import React, { Component, type ComponentType } from 'react';

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

export default class AppContainer extends Component<Props, State> {
  state = { mainKey: 1 };

  static childContextTypes = {
    rootTag: any
  };

  static propTypes = {
    WrapperComponent: any,
    children: node,
    rootTag: any.isRequired
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
