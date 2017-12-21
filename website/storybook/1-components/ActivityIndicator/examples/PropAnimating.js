/**
 * @flow
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const ActivityIndicatorAnimatingExample = () => (
  <View style={styles.horizontal}>
    <ActivityIndicator />
    <ActivityIndicator animating={false} />
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default ActivityIndicatorAnimatingExample;
