/**
 * @flow
 */

import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ImageSourceExample = () =>
  <View style={styles.row}>
    <View style={styles.column}>
      <Text style={styles.text}>Static image</Text>
      <Image source={sources.static} style={styles.image} />
    </View>
    <View style={styles.column}>
      <Text style={styles.text}>Animated GIF</Text>
      <Image source={sources.animatedGif} style={styles.image} />
    </View>
    <View style={styles.column}>
      <Text style={styles.text}>Data PNG</Text>
      <Image source={sources.dataPng} style={styles.image} />
    </View>
    <View style={styles.column}>
      <Text style={styles.text}>Data SVG</Text>
      <Image source={sources.dataSvg} style={styles.image} />
    </View>
  </View>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  column: {
    marginRight: '1rem'
  },
  text: {
    marginBottom: '0.5rem'
  },
  image: {
    flex: 1,
    height: 50,
    resizeMode: 'contain'
  }
});

export default ImageSourceExample;
