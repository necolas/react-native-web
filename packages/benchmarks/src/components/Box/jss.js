/* eslint-disable react/prop-types */
import classnames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';
import View from '../View/jss';

const Box = ({ classes, color, fixed = false, layout = 'column', outer = false, ...other }) => (
  <View
    {...other}
    className={classnames({
      [classes[`color${color}`]]: true,
      [classes.fixed]: fixed,
      [classes.row]: layout === 'row',
      [classes.outer]: outer
    })}
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

export default injectSheet(styles)(Box);
