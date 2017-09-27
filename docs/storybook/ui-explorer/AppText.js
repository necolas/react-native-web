/* eslint-disable react/prop-types */

/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppText = ({ style, ...rest }) => (
  <Text
    {...rest}
    accessibilityRole={rest.href ? 'link' : undefined}
    style={[styles.baseText, style, rest.href && styles.link]}
  />
);

export default AppText;

const styles = StyleSheet.create({
  baseText: {
    fontSize: '1rem',
    lineHeight: '1.3125em'
  },
  link: {
    color: '#1B95E0',
    marginTop: 'calc(0.5 * 1.3125rem)',
    textDecorationLine: 'underline'
  }
});
