/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React from 'react';
import View from '../View/index.platform';

const Box = ({ color, fixed = false, layout = 'column', outer = false, ...other }) => (
  <View
    {...other}
    className={classnames(`color${color}`, {
      fixed: fixed,
      outer: outer,
      row: layout === 'row'
    })}
  />
);

module.exports = Box;
