import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Draggable() {
  return (
    <View style={styles.container}>
      <Image draggable={true} source={sources.large} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 300,
    height: 200,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
});
