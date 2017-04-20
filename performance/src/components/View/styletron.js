/* eslint-disable react/prop-types */
import classnames from 'classnames';
import Styletron from 'styletron-client';
import { injectStylePrefixed } from 'styletron-utils';
import React from 'react';

export const styletron = new Styletron();

const View = ({ style, ...other }) => <div {...other} className={classnames(viewStyle, ...style)} />;

const viewStyle = injectStylePrefixed(styletron, {
  alignItems: 'stretch',
  borderWidth: '0px',
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: '0',
  margin: '0px',
  padding: '0px',
  position: 'relative',
  // fix flexbox bugs
  minHeight: '0px',
  minWidth: '0px'
});

export default View;
