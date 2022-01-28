import { mergeClasses, shorthands, makeStyles } from '@griffel/react';
import React from 'react';

const useClasses = makeStyles({
  initial: {
    alignItems: 'stretch',
    ...shorthands.borderWidth('0'),
    ...shorthands.borderStyle('solid'),
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    position: 'relative',
    minHeight: 0,
    minWidth: 0
  }
});

function View(props) {
  const classes = useClasses();

  return <div {...props} className={mergeClasses(classes.initial, props.className)} />;
}

export default View;
