/* eslint-disable react/prop-types */
import { css } from 'glamor';
import React from 'react';
import View from '../View';

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
  outer: css({
    padding: 4
  }),
  row: css({
    flexDirection: 'row'
  }),
  color0: css({
    backgroundColor: '#222'
  }),
  color1: css({
    backgroundColor: '#666'
  }),
  color2: css({
    backgroundColor: '#999'
  }),
  color3: css({
    backgroundColor: 'blue'
  }),
  color4: css({
    backgroundColor: 'orange'
  }),
  color5: css({
    backgroundColor: 'red'
  }),
  fixed: css({
    width: 20,
    height: 20
  })
};

module.exports = Box;
