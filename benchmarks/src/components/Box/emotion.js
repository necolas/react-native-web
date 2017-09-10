/* eslint-disable react/prop-types */
import React from 'react';
import View from '../View/emotion';

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
  outer: {
    padding: 4
  },
  row: {
    flexDirection: 'row'
  },
  color0: {
    backgroundColor: '#222'
  },
  color1: {
    backgroundColor: '#666'
  },
  color2: {
    backgroundColor: '#999'
  },
  color3: {
    backgroundColor: 'blue'
  },
  color4: {
    backgroundColor: 'orange'
  },
  color5: {
    backgroundColor: 'red'
  },
  fixed: {
    width: 20,
    height: 20
  }
};

export default Box;
