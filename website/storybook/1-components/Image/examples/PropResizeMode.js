/**
 * @flow
 */

import React from 'react';
import sources from '../sources';
import { Image, StyleSheet, Text, View } from 'react-native';

const ImageResizeModeExample = () => (
  <View>
    {[sources.small].map((source, i) => {
      return (
        <View key={i}>
          <View style={styles.horizontal}>
            <View>
              <Text style={[styles.resizeModeText]}>Contain</Text>
              <Image
                resizeMode={Image.resizeMode.contain}
                source={source}
                style={styles.resizeMode}
              />
            </View>
            <View>
              <Text style={[styles.resizeModeText]}>Cover</Text>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={source}
                style={styles.resizeMode}
              />
            </View>
            <View>
              <Text style={[styles.resizeModeText]}>Stretch</Text>
              <Image
                resizeMode={Image.resizeMode.stretch}
                source={source}
                style={styles.resizeMode}
              />
            </View>
            <View>
              <Text style={[styles.resizeModeText]}>Repeat</Text>
              <Image resizeMode={'repeat'} source={source} style={styles.resizeMode} />
            </View>
            <View>
              <Text style={[styles.resizeModeText]}>Center</Text>
              <Image resizeMode={'center'} source={source} style={styles.resizeMode} />
            </View>
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  resizeMode: {
    borderColor: 'black',
    borderWidth: 0.5,
    height: 120,
    width: 120
  },
  resizeModeText: {
    marginBottom: '0.5rem'
  },
  leftMargin: {
    marginLeft: 10
  }
});

export default ImageResizeModeExample;
