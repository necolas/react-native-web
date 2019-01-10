/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextBox = ({ color, outer = false, ...other }) => (
  <Text {...other} style={[styles.root, styles[`color${color}`], outer && styles.outer]} />
);

const styles = StyleSheet.create({
  root: {
    color: 'white'
  },
  outer: {
    fontStyle: 'italic'
  },
  row: {
    flexDirection: 'row'
  },
  color0: {
    color: '#14171A'
  },
  color1: {
    color: '#AAB8C2'
  },
  color2: {
    color: '#E6ECF0'
  },
  color3: {
    color: '#FFAD1F'
  },
  color4: {
    color: '#F45D22'
  },
  color5: {
    color: '#E0245E'
  }
});

export default TextBox;
