/**
 * @flow
 */

// import React from 'react';
import { StyleSheet } from 'react-native';

const createUncachedURI = source => {
  const helper = str => `${str}?t=${Date.now()}`;
  const uri = typeof source === 'string' ? source : source.uri;
  return typeof source === 'string' ? helper(uri) : { ...source, uri: helper(uri) };
};

const styles = StyleSheet.create({
  base: {
    height: 200,
    width: 300
  },
  row: {
    flexDirection: 'row'
  },
  centerRow: {
    alignItems: 'center'
  },
  marginTop: {
    marginTop: '1rem'
  }
});

export { createUncachedURI, styles };
