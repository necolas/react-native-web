/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React from 'react';
import View from '../View/css-modules';
import styles from './styles.css';

const Box = ({ color, fixed = false, layout = 'column', outer = false, ...other }) => (
  <View
    {...other}
    className={classnames(styles[`color${color}`], {
      [styles.fixed]: fixed,
      [styles.outer]: outer,
      [styles.row]: layout === 'row'
    })}
  />
);

export default Box;
