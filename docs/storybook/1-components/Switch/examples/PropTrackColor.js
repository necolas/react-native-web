/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { Switch, View } from 'react-native';

const colors = ['#ddd', '#aaa', '#999', '#666', '#000'];
const itemStyle = [styles.marginVertical, styles.marginRight];

const SwitchTrackColorExample = () => (
  <View style={styles.row}>
    <View style={itemStyle}>
      <Switch value={false} />
    </View>
    {colors.map((color, i) => (
      <View key={i} style={itemStyle}>
        <Switch trackColor={color} value={false} />
      </View>
    ))}
  </View>
);

export default SwitchTrackColorExample;
