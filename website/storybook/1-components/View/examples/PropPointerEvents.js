/* eslint-disable react/prop-types */
/* @flow */

import { logger } from '../helpers';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const Box = ({ pointerEvents }) => (
  <TouchableHighlight
    onPress={logger}
    pointerEvents={pointerEvents}
    style={styles.box}
    underlayColor="purple"
  >
    <TouchableHighlight onPress={logger} style={styles.content} underlayColor="orange">
      <Text>{pointerEvents}</Text>
    </TouchableHighlight>
  </TouchableHighlight>
);

const ViewPointerEventsExample = () => (
  <View pointerEvents="box-none">
    <View pointerEvents="box-none" style={styles.container}>
      <Box pointerEvents="none" />
      <Box pointerEvents="auto" />
      <Box pointerEvents="box-only" />
      <Box pointerEvents="box-none" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ececec',
    padding: 30,
    marginVertical: 5
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  }
});
export default ViewPointerEventsExample;
