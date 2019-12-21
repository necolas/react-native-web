/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from './types';

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import filterSupportedProps from './filterSupportedProps';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import React from 'react';

export type { ViewProps };

const calculateHitSlopStyle = hitSlop => {
  const hitStyle = {};
  for (const prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      const value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }
  return hitStyle;
};

class View extends React.Component<ViewProps> {
  static displayName = 'View';

  renderView(hasTextAncestor) {
    const hitSlop = this.props.hitSlop;
    const supportedProps = filterSupportedProps(this.props);

    if (process.env.NODE_ENV !== 'production') {
      React.Children.toArray(this.props.children).forEach(item => {
        if (typeof item === 'string') {
          console.error(
            `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`
          );
        }
      });
    }

    supportedProps.classList = [classes.view];
    supportedProps.ref = this.props.forwardedRef;
    supportedProps.style = StyleSheet.compose(
      hasTextAncestor && styles.inline,
      this.props.style
    );

    if (hitSlop) {
      const hitSlopStyle = calculateHitSlopStyle(hitSlop);
      const hitSlopChild = createElement('span', {
        classList: [classes.hitSlop],
        style: hitSlopStyle
      });
      supportedProps.children = React.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return createElement('div', supportedProps);
  }

  render() {
    return (
      <TextAncestorContext.Consumer>
        {hasTextAncestor => this.renderView(hasTextAncestor)}
      </TextAncestorContext.Consumer>
    );
  }
}

const classes = css.create({
  view: {
    alignItems: 'stretch',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  }
});

const styles = StyleSheet.create({
  inline: {
    display: 'inline-flex'
  }
});

export default applyLayout(applyNativeMethods(View));
