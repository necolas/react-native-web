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

import createElement from '../createElement';
import css from '../StyleSheet/css';
import setAndForwardRef from '../../modules/setAndForwardRef';
import useElementLayout from '../../hooks/useElementLayout';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import React, { forwardRef, useContext, useRef } from 'react';

export type { ViewProps };

function createHitSlopElement(hitSlop) {
  const hitSlopStyle = {};
  for (const prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      const value = hitSlop[prop];
      hitSlopStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }
  return createElement('span', {
    classList: [classes.hitSlop],
    style: hitSlopStyle
  });
}

const View = forwardRef<ViewProps, *>((props, ref) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    forwardedRef,
    hitSlop,
    importantForAccessibility,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onLayout,
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture,
    pointerEvents,
    testID,
    // unstable
    onClick,
    onClickCapture,
    onScroll,
    onWheel,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
    onMouseOut,
    onMouseUp,
    onTouchCancel,
    onTouchCancelCapture,
    onTouchEnd,
    onTouchEndCapture,
    onTouchMove,
    onTouchMoveCapture,
    onTouchStart,
    onTouchStartCapture,
    href,
    itemID,
    itemRef,
    itemProp,
    itemScope,
    itemType,
    rel,
    target,
    unstable_ariaSet,
    unstable_dataSet
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(props.children).forEach(item => {
      if (typeof item === 'string') {
        console.error(`Unexpected text node: ${item}. A text node cannot be a child of a <View>.`);
      }
    });
  }

  const hasTextAncestor = useContext(TextAncestorContext);
  const hostRef = useRef(null);
  const setRef = setAndForwardRef({
    getForwardedRef: () => forwardedRef,
    setLocalRef: c => {
      hostRef.current = c;
    }
  });

  const children = hitSlop
    ? React.Children.toArray([createHitSlopElement(hitSlop), props.children])
    : props.children;
  const classList = [classes.view];
  const style = StyleSheet.compose(
    hasTextAncestor && styles.inline,
    props.style
  );

  useElementLayout(hostRef, onLayout);
  usePlatformMethods(hostRef, ref, classList, style);

  return createElement('div', {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    children,
    classList,
    importantForAccessibility,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture,
    pointerEvents,
    ref: setRef,
    style,
    testID,
    // unstable
    onClick,
    onClickCapture,
    onScroll,
    onWheel,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
    onMouseOut,
    onMouseUp,
    onTouchCancel,
    onTouchCancelCapture,
    onTouchEnd,
    onTouchEndCapture,
    onTouchMove,
    onTouchMoveCapture,
    onTouchStart,
    onTouchStartCapture,
    href,
    itemID,
    itemRef,
    itemProp,
    itemScope,
    itemType,
    rel,
    target,
    unstable_ariaSet,
    unstable_dataSet
  });
});

View.displayName = 'View';

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

export default View;
