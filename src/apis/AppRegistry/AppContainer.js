/**
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

class AppContainer extends Component {
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
      <View pointerEvents="box-none" style={styles.appContainer}>
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

module.exports = AppContainer;
