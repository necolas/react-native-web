import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import React from 'react';

import View from './View';

const useClasses = makeStyles({
  outer: {
    alignSelf: 'flex-start',
    ...shorthands.padding('4px')
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
    width: '6px',
    height: '6px'
  }
});

const Box = ({ color, fixed = false, layout = 'column', outer = false, ...other }) => {
  const classes = useClasses();
  const className = mergeClasses(
    classes[`color${color}`],
    fixed && classes.fixed,
    outer && classes.outer,
    layout === 'row' && classes.row
  );

  return <View {...other} className={className} />;
};

export default Box;
