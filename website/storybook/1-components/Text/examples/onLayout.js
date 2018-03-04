/**
 * @flow
 */

import React from 'react';
import { Text, TextPropTypes, StyleSheet } from 'react-native';

export default class OnLayoutExample extends React.Component {
  static propTypes = {
    style: TextPropTypes.style
  };

  state = {
    layoutInfo: {}
  };

  onLayout = ({ nativeEvent }) => {
    this.setState({ layoutInfo: nativeEvent.layout });
  };

  render() {
    return (
      <Text onLayout={this.onLayout} style={[styles.root, this.props.style]}>
        {JSON.stringify(this.state.layoutInfo)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#eee'
  }
});
