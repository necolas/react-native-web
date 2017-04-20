/* eslint-disable react/prop-types */
import React from 'react';
import StyleSheet from 'react-native/apis/StyleSheet';
import registry from 'react-native/apis/StyleSheet/registry';
import createDOMProps from 'react-native/modules/createDOMProps';

const View = props => (
  <div {...createDOMProps(props, style => registry.resolve([styles.root, style]))} />
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    position: 'relative',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  }
});

module.exports = View;
