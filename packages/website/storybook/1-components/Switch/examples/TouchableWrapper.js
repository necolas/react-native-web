/* eslint-disable react/jsx-no-bind */
/**
 * @flow
 */

import React from 'react';
import { Switch, TouchableHighlight, View } from 'react-native';

class TouchableWrapperExample extends React.PureComponent {
  state = {
    on: false
  };

  render() {
    const { on } = this.state;

    return (
      <View>
        <TouchableHighlight onPress={() => {}} style={style} underlayColor="#eee">
          <Switch onValueChange={this._handleChange} value={on} />
        </TouchableHighlight>
      </View>
    );
  }

  _handleChange = value => {
    this.setState({ on: value });
  };
}

const style = {
  alignSelf: 'flex-start',
  borderWidth: 1,
  borderColor: '#ddd',
  paddingHorizontal: 50,
  paddingVertical: 20
};

export default TouchableWrapperExample;
