import classnames from 'classnames';
import React from 'react';
import View from './View';
import styles from './box-styles.css';

const Box = ({
  color,
  fixed = false,
  layout = 'column',
  outer = false,
  ...rest
}) => (
  <View
    {...rest}
    className={classnames(styles[`color${color}`], {
      [styles.fixed]: fixed,
      [styles.outer]: outer,
      [styles.row]: layout === 'row'
    })}
  />
);

export default Box;
