/**
 * @flow
 */

import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const ImageChildrenExample = () => (
  <Image source={sources.large} style={styles.image}>
    <Text style={styles.text}>Child content</Text>
  </Image>
);

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    top: 50
  }
});

export default ImageChildrenExample;
