import React from 'react';
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center'
  }
});

export default function (storyFn) {
  return <View style={[ StyleSheet.absoluteFill, styles.root ]}>{storyFn()}</View>;
}
