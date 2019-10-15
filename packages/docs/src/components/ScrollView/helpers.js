import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Button = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

function Item(props) {
  return (
    <View style={[styles.item, props.style]}>
      <Text>{props.msg}</Text>
    </View>
  );
}

export const createItemRow = (msg, index) => <Item key={index} msg={msg} />;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 3
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96
  }
});
