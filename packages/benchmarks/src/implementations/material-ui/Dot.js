/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    cursor: 'pointer',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    transform: 'translate(50%, 50%)'
  },
  dynamic: ({ size, x, y, children, color }) => ({
    borderBottomColor: color,
    borderRightWidth: `${size / 2}px`,
    borderBottomWidth: `${size / 2}px`,
    borderLeftWidth: `${size / 2}px`,
    marginLeft: `${x}px`,
    marginTop: `${y}px`
  })
});

function Dot(props) {
  const classes = useStyles(props);
  return <div className={`${classes.root} ${classes.dynamic}`}>{props.children}</div>;
}

export default Dot;
