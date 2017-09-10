/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { Switch, View } from 'react-native';

const colors = ['#1DA1F2', '#17BF63', '#F45D22', '#794BC4', '#E0245E'];
const itemStyle = [styles.marginVertical, styles.marginRight];

const SwitchActiveTrackColorExample = () => (
  <View style={styles.row}>
    <View style={itemStyle}>
      <Switch value={true} />
    </View>
    {colors.map((color, i) => (
      <View key={i} style={itemStyle}>
        <Switch activeThumbColor="#ccc" activeTrackColor={color} value={true} />
      </View>
    ))}
  </View>
);

export default SwitchActiveTrackColorExample;
