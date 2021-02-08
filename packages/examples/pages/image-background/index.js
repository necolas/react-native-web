import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import Example from '../../shared/example';

const source =
  'https://images.unsplash.com/photo-1481595357459-84468f6eeaac?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb';

export default function ImageBackgroundPage() {
  return (
    <Example title="ImageBackground">
      <ImageBackground source={source} style={styles.image}>
        <Text style={styles.text}>Child content</Text>
      </ImageBackground>
    </Example>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    top: 50
  }
});
