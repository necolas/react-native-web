/* eslint-disable no-alert */

/**
 * @flow
 */

import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';

const valueChangeFunction = (itemValue, itemPosition) => {
  window.alert(`itemValue: ${itemValue}, itemPosition: ${itemPosition}`);
};

const PickerOnValueChangeExample = () => (
  <View style={styles.horizontal}>
    <Picker onValueChange={valueChangeFunction}>
      <Picker.Item label="Sourcerer's Stone" value="1" />
      <Picker.Item label="Chamber of Secrets" value="2" />
      <Picker.Item label="Prisoner of Azkaban" value="3" />
      <Picker.Item label="Goblet of Fire" value="4" />
      <Picker.Item label="Order of the Phoenix" value="5" />
      <Picker.Item label="Half-Blood Prince" value="6" />
      <Picker.Item label="Deathly Hallows" value="7" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row'
  }
});

export default PickerOnValueChangeExample;
