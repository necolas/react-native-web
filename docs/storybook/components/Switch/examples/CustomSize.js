/**
 * @flow
 */

import React, { PureComponent } from 'react';
import { Switch, View } from 'react-native';

class CustomSizeExample extends PureComponent {
  state = {
    firstIsOn: true,
    secondIsOn: false
  };

  render() {
    const { firstIsOn, secondIsOn } = this.state;

    return (
      <View>
        <Switch
          onValueChange={this._handleFirst}
          style={{ marginBottom: 10, height: 30 }}
          value={firstIsOn}
        />
        <Switch
          onValueChange={this._handleSecond}
          style={{ height: 30, width: 150 }}
          value={secondIsOn}
        />
      </View>
    );
  }

  _handleFirst = value => {
    this.setState({ firstIsOn: value });
  };

  _handleSecond = value => {
    this.setState({ secondIsOn: value });
  };
}

export default CustomSizeExample;
