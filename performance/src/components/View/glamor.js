/* eslint-disable react/prop-types */
import { css } from 'glamor';
import React from 'react';

const View = ({ style, ...other }) => <div {...other} className={css(viewStyle, ...style)} />;

const viewStyle = {
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
  // button and anchor reset
  backgroundColor: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'inherit',
  textDecorationLine: 'none',
  // list reset
  listStyle: 'none',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0
};

module.exports = View;
