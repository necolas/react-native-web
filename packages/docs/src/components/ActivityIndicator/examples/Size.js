import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const sizes = [20, 'small', 36, 'large', 60];

export default function Size() {
  return (
    <View style={styles.horizontal}>
      {sizes.map((size, i) => (
        <ActivityIndicator key={i} size={size} style={styles.item} />
      ))}
      <ActivityIndicator size="large" style={styles.large} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    paddingRight: 10
  },
  large: {
    marginLeft: 20,
    transform: [{ scale: 1.75 }]
  }
});
