/* eslint-disable react/prop-types */
import { createElement, StyleSheet } from 'react-native';

const Dot = ({ size, x, y, children, color }) =>
  createElement('div', {
    children,
    style: [
      styles.root,
      {
        borderBottomColor: color,
        borderRightWidth: size / 2,
        borderBottomWidth: size / 2,
        borderLeftWidth: size / 2,
        left: x,
        top: y
      }
    ]
  });

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    cursor: 'pointer',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0
  }
});

export default Dot;
