/**
 * @flow
 */

import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

const CheckBoxDisabledExample = () => (
  <View style={styles.row}>
    <View style={styles.marginRight}>
      <CheckBox disabled value={false} />
    </View>
    <View style={styles.marginRight}>
      <CheckBox disabled value />
    </View>
  </View>
);

export default CheckBoxDisabledExample;
