/**
 * @flow
 */

import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';

const PickerExample = props => (
  <View style={styles.root}>
    <Picker {...props}>
      <Picker.Item label="Sourcerer's Stone" value="book-1" />
      <Picker.Item label="Chamber of Secrets" value="book-2" />
      <Picker.Item label="Prisoner of Azkaban" value="book-3" />
      <Picker.Item label="Goblet of Fire" value="book-4" />
      <Picker.Item label="Order of the Phoenix" value="book-5" />
      <Picker.Item label="Half-Blood Prince" value="book-6" />
      <Picker.Item label="Deathly Hallows" value="book-7" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  rootl: {
    alignItems: 'flex-start'
  }
});

export default PickerExample;
