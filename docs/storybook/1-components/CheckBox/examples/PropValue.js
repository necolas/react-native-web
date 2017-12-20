/**
 * @flow
 */

import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

const CheckBoxValueExample = () => (
  <View style={styles.row}>
    <View style={styles.marginRight}>
      <CheckBox value={false} />
    </View>
    <View style={styles.marginRight}>
      <CheckBox value />
    </View>
  </View>
);

export default CheckBoxValueExample;
