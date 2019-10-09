/**
 * @flow
 */

import React, { PureComponent } from 'react';
import { styles } from '../helpers';
import { Switch, View } from 'react-native';

const colors = [
  {
    true: '#ddd',
    false: '#ddd'
  },
  {
    true: '#aaa',
    false: '#aaa'
  },
  {
    true: '#999',
    false: '#999'
  },
  {
    true: '#666',
    false: '#666'
  },
  {
    true: '#000',
    false: '#000'
  }
];
const itemStyle = [styles.marginVertical, styles.marginRight];

class SwitchTrackColorExample extends PureComponent {
  state = {
    eventSwitchIsOn: false
  };

  render() {
    const { eventSwitchIsOn } = this.state;

    return (
      <View style={styles.row}>
        <View style={itemStyle}>
          <Switch onValueChange={this._handleEventSwitch} value={eventSwitchIsOn} />
        </View>
        {colors.map((color, i) => (
          <View key={i} style={itemStyle}>
            <Switch
              onValueChange={this._handleEventSwitch}
              trackColor={color}
              value={eventSwitchIsOn}
            />
          </View>
        ))}
      </View>
    );
  }

  _handleEventSwitch = value => {
    this.setState({ eventSwitchIsOn: value });
  };
}

export default SwitchTrackColorExample;
