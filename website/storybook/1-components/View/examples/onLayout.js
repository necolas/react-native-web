/**
 * @flow
 */

import React from 'react';
import { Text, View, ViewPropTypes, StyleSheet } from 'react-native';

export default class OnLayoutExample extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style
  };

  state = {
    layoutInfo: {}
  };

  onLayout = ({ nativeEvent }) => {
    this.setState({ layoutInfo: nativeEvent.layout });
  };

  render() {
    return (
      <View onLayout={this.onLayout} style={[styles.root, this.props.style]}>
        <Text>{JSON.stringify(this.state.layoutInfo)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#eee'
  }
});
