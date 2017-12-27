/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React from 'react';
import { injectStylePrefixed } from 'styletron-utils';
import { styletron } from './View';

const Dot = ({ size, x, y, children, color }) => (
  <div
    className={classnames(
      styles.root,
      injectStylePrefixed(styletron, {
        borderBottomColor: color,
        borderRightWidth: `${size / 2}px`,
        borderBottomWidth: `${size / 2}px`,
        borderLeftWidth: `${size / 2}px`,
        left: `${x}px`,
        top: `${y}px`
      })
    )}
  >
    {children}
  </div>
);

const styles = {
  root: injectStylePrefixed(styletron, {
    position: 'absolute',
    cursor: 'pointer',
    width: 0,
    height: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0
  })
};

export default Dot;
