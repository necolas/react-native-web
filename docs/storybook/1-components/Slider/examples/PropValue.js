/**
 * @flow
 */
import { styles } from '../helpers';
import React from 'react';
import { Slider, View } from 'react-native';

const values = [0, 0.5, 1];
const PropValue = () => (
  <View style={styles.row}>
    {values.map((item, index) => (
      <View key={index} value={item}>
        <Slider value={item}/>
      </View>
    ))}
  </View>
);

export default PropValue;
