import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native-web';

const log = (...msg) => {
  console.log(...msg);
};

const Box = ({ pointerEvents }) => (
  <TouchableHighlight
    onPress={log}
    pointerEvents={pointerEvents}
    style={styles.box}
    underlayColor="purple"
  >
    <TouchableHighlight onPress={log} style={styles.content} underlayColor="orange">
      <Text>{pointerEvents}</Text>
    </TouchableHighlight>
  </TouchableHighlight>
);

export default function PointerEvents() {
  return (
    <View pointerEvents="box-none">
      <View pointerEvents="box-none" style={styles.container}>
        <Box pointerEvents="none" />
        <Box pointerEvents="auto" />
        <Box pointerEvents="box-only" />
        <Box pointerEvents="box-none" />
      </View>
    </View>
  );
}

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
