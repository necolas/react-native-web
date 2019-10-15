import styles from './styles';
import React, { PureComponent } from 'react';
import { CheckBox, Text, View } from 'react-native';

class OnValueChangeExample extends PureComponent {
  state = {
    eventSwitchIsOn: false,
    eventSwitchRegressionIsOn: true
  };

  render() {
    const { eventSwitchIsOn, eventSwitchRegressionIsOn } = this.state;

    return (
      <View style={styles.row}>
        <View style={[styles.alignCenter, styles.marginRight]}>
          <CheckBox
            onValueChange={this._handleEventSwitch}
            style={styles.marginBottom}
            value={eventSwitchIsOn}
          />
          <CheckBox
            onValueChange={this._handleEventSwitch}
            style={styles.marginBottom}
            value={eventSwitchIsOn}
          />
          <Text>{eventSwitchIsOn ? 'On' : 'Off'}</Text>
        </View>
        <View style={styles.alignCenter}>
          <CheckBox
            onValueChange={this._handleEventSwitchRegression}
            style={styles.marginBottom}
            value={eventSwitchRegressionIsOn}
          />
          <CheckBox
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

export default function OnValueChange() {
  return <OnValueChangeExample />;
}
