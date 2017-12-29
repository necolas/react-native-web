/**
 * @flow
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const sizes = [20, 'small', 36, 'large', 60];

const ActivityIndicatorSizeExample = () => (
  <View style={styles.horizontal}>
    {sizes.map((size, i) => <ActivityIndicator key={i} size={size} style={styles.rightPadding} />)}
    <ActivityIndicator size="large" style={styles.large} />
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightPadding: {
    paddingRight: 10
  },
  large: { marginLeft: 20, transform: [{ scale: 1.75 }] }
});

ActivityIndicatorSizeExample.metadata = {
  id: 'ActivityIndicator.props.size',
  description: ''
};

export default ActivityIndicatorSizeExample;
