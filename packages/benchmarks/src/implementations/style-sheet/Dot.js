/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, StyleResolver } from 'style-sheet';

const Dot = ({ size, x, y, children, color }) => {
  const dynamic = StyleSheet.create({
    root: {
      borderBottomColor: color,
      borderRightWidth: `${size / 2}px`,
      borderBottomWidth: `${size / 2}px`,
      borderLeftWidth: `${size / 2}px`,
      marginLeft: `${x}px`,
      marginTop: `${y}px`
    }
  }).root;

  return <div className={StyleResolver.resolve([styles.root, dynamic])}>{children}</div>;
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    cursor: 'pointer',
    width: '0',
    height: '0',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopWidth: '0',
    transform: 'translate(50%, 50%)'
  }
});

export default Dot;
