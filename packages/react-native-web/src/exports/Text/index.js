/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { TextProps } from './types';

import createElement from '../createElement';
import css from '../StyleSheet/css';
import setAndForwardRef from '../../modules/setAndForwardRef';
import useElementLayout from '../../hooks/useElementLayout';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import useResponderEvents from '../../hooks/useResponderEvents';
import React, { forwardRef, useContext, useRef } from 'react';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';

const Text = forwardRef<TextProps, *>((props, ref) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    dir,
    forwardedRef,
    importantForAccessibility,
    lang,
    nativeID,
    numberOfLines,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onLayout,
    onPress,
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
    selectable,
    testID,
    // unstable
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

  const hasTextAncestor = useContext(TextAncestorContext);
  const hostRef = useRef(null);
  const setRef = setAndForwardRef({
    getForwardedRef: () => forwardedRef,
    setLocalRef: c => {
      hostRef.current = c;
    }
  });

  const classList = [
    classes.text,
    hasTextAncestor === true && classes.textHasAncestor,
    numberOfLines === 1 && classes.textOneLine,
    numberOfLines != null && numberOfLines > 1 && classes.textMultiLine
  ];
  const style = [
    props.style,
    numberOfLines != null && numberOfLines > 1 && { WebkitLineClamp: numberOfLines },
    selectable === false && styles.notSelectable,
    onPress && styles.pressable
  ];

  useElementLayout(hostRef, onLayout);
  usePlatformMethods(hostRef, ref, classList, style);
  useResponderEvents(hostRef, {
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
    onStartShouldSetResponderCapture
  });

  function handleClick(e) {
    if (onClick != null) {
      onClick(e);
    }
    if (onClick == null && onPress != null) {
      e.stopPropagation();
      onPress(e);
    }
  }

  const component = hasTextAncestor ? 'span' : 'div';
  const element = createElement(component, {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessible: onPress != null ? true : null,
    children,
    classList,
    // allow browsers to automatically infer the language writing direction
    dir: dir !== undefined ? dir : 'auto',
    importantForAccessibility,
    lang,
    nativeID,
    onBlur,
    onClick: handleClick,
    onContextMenu,
    onFocus,
    ref: setRef,
    style,
    testID,
    // unstable
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

  return hasTextAncestor ? (
    element
  ) : (
    <TextAncestorContext.Provider value={true}>{element}</TextAncestorContext.Provider>
  );
});

Text.displayName = 'Text';

const classes = css.create({
  text: {
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  },
  textOneLine: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // See #13
  textMultiLine: {
    display: '-webkit-box',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical'
  }
});

const styles = StyleSheet.create({
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  }
});

export default Text;
