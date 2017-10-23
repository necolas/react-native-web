/**
 * @flow
 */
import { styles } from '../helpers';
import React from 'react';
import { Slider, View } from 'react-native';

const colors = ['#F45D22', '#794BC4', '#E0245E'];

const PropMaximumTrackTintColor = () => (
  <View style={styles.row}>
    {colors.map((item, index) => (
      <View key={index}>
        <Slider maximumTrackTintColor={item} />
      </View>
    ))}
  </View>
);

export default PropMaximumTrackTintColor;
