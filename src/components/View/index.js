/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @providesModule View
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { bool } from 'prop-types';
import createElement from '../../modules/createElement';
import invariant from 'fbjs/lib/invariant';
import StyleSheet from '../../apis/StyleSheet';
import ViewPropTypes from './ViewPropTypes';
import React, { Component } from 'react';

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

class View extends Component {
  static displayName = 'View';

  static contextTypes = {
    isInAParentText: bool
  };

  static propTypes = ViewPropTypes;

  render() {
    const {
      hitSlop,
      style,
      /* eslint-disable */
      collapsable,
      onAccessibilityTap,
      onLayout,
      onMagicTap,
      removeClippedSubviews,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      React.Children.toArray(this.props.children).forEach(item => {
        invariant(
          typeof item !== 'string',
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`
        );
      });
    }

    const { isInAParentText } = this.context;

    otherProps.style = [styles.initial, isInAParentText && styles.inline, style];

    if (hitSlop) {
      const hitSlopStyle = calculateHitSlopStyle(hitSlop);
      const hitSlopChild = createElement('span', { style: [styles.hitSlop, hitSlopStyle] });
      otherProps.children = React.Children.toArray(otherProps.children);
      otherProps.children.unshift(hitSlopChild);
    }

    return createElement('div', otherProps);
  }
}

const styles = StyleSheet.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  },
  inline: {
    display: 'inline-flex'
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  }
});

export default applyLayout(applyNativeMethods(View));
