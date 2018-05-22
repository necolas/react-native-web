/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputNumberOfLinesExample = () => (
  <View>
    <TextInput
      multiline={true}
      numberOfLines={2}
      placeholder="numberOfLines = 2"
      style={[styles.multiline, { height: 'auto' }]}
    />
    <TextInput
      multiline={true}
      numberOfLines={3}
      placeholder="numberOfLines = 3"
      style={[styles.multiline, { height: 'auto' }]}
    />
  </View>
);

export default TextInputNumberOfLinesExample;
