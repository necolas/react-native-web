import { styles } from '../helpers';
import React from 'react';
import { Switch, Text, View } from 'react-native';

export default function OnValueChange() {
  const [switchState, updateSwitch] = React.useState(false);
  const [otherSwitchState, updateOtherSwitch] = React.useState(false);

  const switchValueChange = value => {
    updateSwitch(value);
  };

  const otherSwitchValueChange = value => {
    updateOtherSwitch(value);
  };

  return (
    <View style={styles.row}>
      <View style={[styles.alignCenter, styles.marginRight]}>
        <Switch onValueChange={switchValueChange} style={styles.marginBottom} value={switchState} />
        <Switch onValueChange={switchValueChange} style={styles.marginBottom} value={switchState} />
        <Text>{switchState ? 'On' : 'Off'}</Text>
      </View>
      <View style={styles.alignCenter}>
        <Switch
          onValueChange={otherSwitchValueChange}
          style={styles.marginBottom}
          value={otherSwitchState}
        />
        <Switch
          onValueChange={otherSwitchValueChange}
          style={styles.marginBottom}
          value={otherSwitchState}
        />
        <Text>{otherSwitchState ? 'On' : 'Off'}</Text>
      </View>
    </View>
  );
}
