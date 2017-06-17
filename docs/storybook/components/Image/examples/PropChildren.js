/**
 * @flow
 */

import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const ImageChildrenExample = () =>
  <Image source={sources.large} style={styles.image}>
    <Text style={styles.text}>
      React
    </Text>
  </Image>;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white'
  }
});

export default ImageChildrenExample;
