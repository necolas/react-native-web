/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

const DividerHorizontal = () => <View style={styles.horizontalDivider} />;
const DividerVertical = () => <View style={styles.verticalDivider} />;

export const styles = StyleSheet.create({
  horizontalDivider: {
    width: '0.6rem'
  },
  verticalDivider: {
    height: '1.3125rem'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  marginRight: {
    marginRight: 10
  },
  marginBottom: {
    marginBottom: 10
  },
  marginVertical: {
    marginVertical: 5
  },
  alignCenter: {
    alignItems: 'center'
  }
});

export { DividerHorizontal, DividerVertical };
