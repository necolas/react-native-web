/* eslint-disable react/jsx-no-bind */

/**
 * @flow
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const onScroll = () => {
  console.log('ScrollView.onScroll');
};

const VerticalExample = () => (
  <View style={styles.scrollViewContainer}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainerStyle}
      onScroll={onScroll}
      scrollEventThrottle={16} // ~60 events per second
      style={styles.scrollViewStyle}
    >
      {Array.from({ length: 50 }).map((item, i) => (
        <View key={i} style={[styles.box, styles.horizontalBox]}>
          <Text>{i}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const HorizontalExample = () => (
  <View style={styles.scrollViewContainer}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainerStyle}
      horizontal
      onScroll={onScroll}
      scrollEventThrottle={16} // ~60 events per second
      style={styles.scrollViewStyle}
    >
      {Array.from({ length: 50 }).map((item, i) => (
        <View key={i} style={[styles.box, styles.horizontalBox]}>
          <Text>{i}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

export { HorizontalExample, VerticalExample };

const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  scrollViewContainer: {
    height: 200,
    width: 300
  },
  scrollViewStyle: {
    borderWidth: 1
  },
  scrollViewContentContainerStyle: {
    backgroundColor: '#eee',
    padding: 10
  }
});
