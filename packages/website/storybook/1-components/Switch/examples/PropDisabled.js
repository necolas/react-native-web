/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { Switch, View } from 'react-native';

const SwitchDisabledExample = () => (
  <View style={styles.row}>
    <View style={styles.marginRight}>
      <Switch disabled={true} value={false} />
    </View>
    <View style={styles.marginRight}>
      <Switch disabled={true} value={true} />
    </View>
  </View>
);

export default SwitchDisabledExample;
