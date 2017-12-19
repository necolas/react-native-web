/**
 * @flow
 */
import { styles } from '../helpers';
import React from 'react';
import { Slider, View } from 'react-native';

const SliderValueExample = () => (
  <View style={styles.row}>
    <View>
      <Slider disabled />
    </View>
    <View>
      <Slider />
    </View>
  </View>
);

export default SliderValueExample;
