/* eslint-disable react/prop-types */
import React from 'react';
import { Styles, View } from 'reactxp';

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
  outer: Styles.createViewStyle({
    padding: 4
  }),
  row: Styles.createViewStyle({
    flexDirection: 'row'
  }),
  color0: Styles.createViewStyle({
    backgroundColor: '#222'
  }),
  color1: Styles.createViewStyle({
    backgroundColor: '#666'
  }),
  color2: Styles.createViewStyle({
    backgroundColor: '#999'
  }),
  color3: Styles.createViewStyle({
    backgroundColor: 'blue'
  }),
  color4: Styles.createViewStyle({
    backgroundColor: 'orange'
  }),
  color5: Styles.createViewStyle({
    backgroundColor: 'red'
  }),
  fixed: Styles.createViewStyle({
    width: 20,
    height: 20
  })
};

export default Box;
