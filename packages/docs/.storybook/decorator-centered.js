import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    maxWidth: '100%'
  }
});

export default function(renderStory) {
  return <View style={styles.root}>{renderStory()}</View>;
}
