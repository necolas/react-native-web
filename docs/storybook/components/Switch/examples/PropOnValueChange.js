/**
 * @flow
 */

import { styles } from '../helpers';
import React, { PureComponent } from 'react';
import { Switch, Text, View } from 'react-native';

class SwitchOnValueChangeExample extends PureComponent {
  state = {
    eventSwitchIsOn: false,
    eventSwitchRegressionIsOn: true
  };

  render() {
    const { eventSwitchIsOn, eventSwitchRegressionIsOn } = this.state;

    return (
      <View style={styles.row}>
        <View style={[styles.alignCenter, styles.marginRight]}>
          <Switch
            onValueChange={this._handleEventSwitch}
            style={styles.marginBottom}
            value={eventSwitchIsOn}
          />
          <Switch
            onValueChange={this._handleEventSwitch}
            style={styles.marginBottom}
            value={eventSwitchIsOn}
          />
          <Text>{eventSwitchIsOn ? 'On' : 'Off'}</Text>
        </View>
        <View style={styles.alignCenter}>
          <Switch
            onValueChange={this._handleEventSwitchRegression}
            style={styles.marginBottom}
            value={eventSwitchRegressionIsOn}
          />
          <Switch
            onValueChange={this._handleEventSwitchRegression}
            style={styles.marginBottom}
            value={eventSwitchRegressionIsOn}
          />
          <Text>{eventSwitchRegressionIsOn ? 'On' : 'Off'}</Text>
        </View>
      </View>
    );
  }

  _handleEventSwitch = value => {
    this.setState({ eventSwitchIsOn: value });
  };

  _handleEventSwitchRegression = value => {
    this.setState({ eventSwitchRegressionIsOn: value });
  };
}

export default SwitchOnValueChangeExample;
