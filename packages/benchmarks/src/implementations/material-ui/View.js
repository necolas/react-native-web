/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    position: 'relative',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  }
});

function View(props) {
  const classes = useStyles();
  return <div {...props} className={`${classes.root} ${props.className}`} />;
}

export default View;
