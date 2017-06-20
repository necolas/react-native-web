/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import StyleSheet from '../StyleSheet';
import View from '../../components/View';
import { any, node } from 'prop-types';
import React, { Component } from 'react';

type Context = {
  rootTag: any
};

type Props = {
  children?: React.Children,
  rootTag: any
};

type State = {
  mainKey: number
};

export default class AppContainer extends Component {
  props: Props;
  state: State = { mainKey: 1 };

  static childContextTypes = {
    rootTag: any
  };

  static propTypes = {
    children: node,
    rootTag: any.isRequired
  };

  getChildContext(): Context {
    return {
      rootTag: this.props.rootTag
    };
  }

  render() {
    return (
      <View pointerEvents="box-none" style={[styles.appContainer, StyleSheet.absoluteFill]}>
        <View
          children={this.props.children}
          key={this.state.mainKey}
          pointerEvents="box-none"
          style={styles.appContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /**
   * Ensure that the application covers the whole screen.
   */
  appContainer: {
    flex: 1
  }
});
