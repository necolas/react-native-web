/* eslint-disable react/prop-types */
import { injectStylePrefixed } from 'styletron-utils';
import React from 'react';
import View, { styletron } from '../View/styletron';

const Box = ({ color, fixed = false, layout = 'column', outer = false, ...other }) => (
  <View
    {...other}
    style={[
      styles[`color${color}`],
      fixed && styles.fixed,
      layout === 'row' && styles.row,
      outer && styles.outer
    ]}
  />
);

const styles = {
  outer: injectStylePrefixed(styletron, {
    padding: '4px'
  }),
  row: injectStylePrefixed(styletron, {
    flexDirection: 'row'
  }),
  color0: injectStylePrefixed(styletron, {
    backgroundColor: '#222'
  }),
  color1: injectStylePrefixed(styletron, {
    backgroundColor: '#666'
  }),
  color2: injectStylePrefixed(styletron, {
    backgroundColor: '#999'
  }),
  color3: injectStylePrefixed(styletron, {
    backgroundColor: 'blue'
  }),
  color4: injectStylePrefixed(styletron, {
    backgroundColor: 'orange'
  }),
  color5: injectStylePrefixed(styletron, {
    backgroundColor: 'red'
  }),
  fixed: injectStylePrefixed(styletron, {
    width: '20px',
    height: '20px'
  })
};

export default Box;
