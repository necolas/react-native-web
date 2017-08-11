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
import createDOMElement from '../../modules/createDOMElement';
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

    const { isInAParentText } = this.context;

    otherProps.style = [styles.initial, isInAParentText && styles.inline, style]

    if (hitSlop) {
      const hitSlopStyle = calculateHitSlopStyle(hitSlop);
      const hitSlopChild = createDOMElement('span', { style: [styles.hitSlop, hitSlopStyle] });
      otherProps.children = React.Children.toArray(otherProps.children);
      otherProps.children.unshift(hitSlopChild);
      otherProps.style.unshift(styles.hasHitSlop);
    }

    // avoid HTML validation errors
    const component = 'div';

    return createDOMElement(component, otherProps);
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
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  },
  inline: {
    display: 'inline-flex'
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hasHitSlop: {
    zIndex: 0
  },
  hitSlop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  }
});

export default applyLayout(applyNativeMethods(View));
