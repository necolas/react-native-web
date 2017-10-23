/**
 * @flow
 */
import { styles } from '../helpers';
import React from 'react';
import { Slider, View } from 'react-native';

const SliderValueExample = () => (
  <View style={styles.row}>
    <View>
      <Slider
        maximumValue={4}
        step={1}
        value={2}
      />
    </View>
  </View>
);

export default SliderValueExample;
