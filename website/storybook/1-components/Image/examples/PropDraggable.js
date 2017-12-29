/**
 * @flow
 */

import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ImageDraggableExample = () => (
  <View style={styles.container}>
    <Image draggable={false} source={sources.large} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  image: {
    width: 300,
    height: 200,
    backgroundColor: 'transparent',
    marginRight: 10
  }
});

export default ImageDraggableExample;
