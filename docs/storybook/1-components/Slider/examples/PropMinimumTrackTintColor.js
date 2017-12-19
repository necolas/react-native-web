/**
 * @flow
 */
import { styles } from '../helpers';
import React from 'react';
import { Slider, View } from 'react-native';

const colors = ['#F45D22', '#794BC4', '#E0245E'];

const PropMinimumTrackTintColor = () => (
  <View style={styles.row}>
    {colors.map((item, index) => (
      <View key={index}>
        <Slider minimumTrackTintColor={item} />
      </View>
    ))}
  </View>
);

export default PropMinimumTrackTintColor;
