/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import View from './View';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  outer: {
    alignSelf: 'flex-start',
    padding: 4
  },
  row: {
    flexDirection: 'row'
  },
  color0: {
    backgroundColor: '#14171A'
  },
  color1: {
    backgroundColor: '#AAB8C2'
  },
  color2: {
    backgroundColor: '#E6ECF0'
  },
  color3: {
    backgroundColor: '#FFAD1F'
  },
  color4: {
    backgroundColor: '#F45D22'
  },
  color5: {
    backgroundColor: '#E0245E'
  },
  fixed: {
    width: 6,
    height: 6
  }
});

function Box({ color, fixed = false, layout = 'column', outer = false, ...other }) {
  const classes = useStyles();

  return (
    <View
      {...other}
      className={classnames(classes[`color${color}`], {
        [classes.fixed]: fixed,
        [classes.outer]: outer,
        [classes.row]: layout === 'row'
      })}
    />
  );
}

export default Box;
