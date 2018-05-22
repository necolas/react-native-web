/**
 * @flow
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ActivityIndicatorColorExample = () => (
  <View style={styles.horizontal}>
    <ActivityIndicator color="#1DA1F2" style={styles.rightPadding} />
    <ActivityIndicator color="#17BF63" style={styles.rightPadding} />
    <ActivityIndicator color="#F45D22" style={styles.rightPadding} />
    <ActivityIndicator color="#794BC4" style={styles.rightPadding} />
    <ActivityIndicator color="#E0245E" style={styles.rightPadding} />
    <ActivityIndicator color="#FFAD1F" style={styles.rightPadding} />
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightPadding: {
    paddingRight: 10
  }
});

ActivityIndicatorColorExample.metadata = {
  id: 'ActivityIndicator.props.color',
  description: ''
};

export default ActivityIndicatorColorExample;
