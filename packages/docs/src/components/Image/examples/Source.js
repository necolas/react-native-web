import sources from '../sources';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Source() {
  return (
    <React.Fragment>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Static image</Text>
          <Image source={sources.static} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Progressive JPEG</Text>
          <Image source={sources.pjpeg} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Animated GIF</Text>
          <Image source={sources.animatedGif} style={styles.image} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>PNG (base64)</Text>
          <Image source={sources.dataBase64Png} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>SVG (base64)</Text>
          <Image source={sources.dataBase64Svg} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>SVG (inline data)</Text>
          <Image source={sources.dataSvg} style={styles.image} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>WebP</Text>
          <Image source={sources.webP} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Dynamic (POST)</Text>
          <Image source={sources.dynamic} style={styles.image} />
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  column: {
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  text: {
    marginBottom: '0.5rem'
  },
  image: {
    borderColor: 'black',
    borderWidth: 0.5,
    height: 120,
    width: 120,
    resizeMode: 'cover'
  }
});
