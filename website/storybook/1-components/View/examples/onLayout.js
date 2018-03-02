/**
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';

export default class OnLayoutExample extends React.Component {
  state = {
    layoutInfo: {}
  };

  onLayout = ({ nativeEvent }) => {
    this.setState({ layoutInfo: nativeEvent.layout });
  };

  render() {
    return (
      <View onLayout={this.onLayout}>
        <Text>{JSON.stringify(this.state.layoutInfo)}</Text>
      </View>
    );
  }
}
