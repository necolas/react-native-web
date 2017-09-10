/**
 * @flow
 */

import { DividerVertical } from '../helpers';
import React from 'react';
import { ProgressBar, StyleSheet, View } from 'react-native';

const ProgressBarCustomSizeExample = () => (
  <View>
    <ProgressBar color="#1DA1F2" progress={0.33} style={styles.one} trackColor="#D1E3F6" />
    <DividerVertical />
    <ProgressBar color="#1DA1F2" progress={0.33} style={styles.two} trackColor="#D1E3F6" />
  </View>
);

const styles = StyleSheet.create({
  one: {
    borderRadius: 10,
    height: 10
  },
  two: {
    borderRadius: 10,
    height: 20
  }
});

export default ProgressBarCustomSizeExample;
