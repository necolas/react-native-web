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

import * as React from 'react';
import { forwardRef, useContext, useRef } from 'react';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import pick from '../../modules/pick';
import useElementLayout from '../../hooks/useElementLayout';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import useResponderEvents from '../../hooks/useResponderEvents';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';

const forwardPropsList = {
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessible: true,
  children: true,
  classList: true,
  dir: true,
  importantForAccessibility: true,
  lang: true,
  nativeID: true,
  onBlur: true,
  onClick: true,
  onClickCapture: true,
  onContextMenu: true,
  onFocus: true,
  onKeyDown: true,
  onKeyUp: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true,
  pointerEvents: true,
  ref: true,
  style: true,
  testID: true,
  // unstable
  dataSet: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseUp: true,
  onScroll: true,
  onWheel: true,
  href: true,
  rel: true,
  target: true
};

const pickProps = props => pick(props, forwardPropsList);

const Text = forwardRef<TextProps, *>((props, forwardedRef) => {
  const {
    dir,
    numberOfLines,
    onClick,
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
    selectable
  } = props;

  const hasTextAncestor = useContext(TextAncestorContext);
  const hostRef = useRef(null);
  const setRef = useMergeRefs(forwardedRef, hostRef);

  const classList = [
    classes.text,
    hasTextAncestor === true && classes.textHasAncestor,
    numberOfLines === 1 && classes.textOneLine,
    numberOfLines != null && numberOfLines > 1 && classes.textMultiLine
  ];
  const style = [
    props.style,
    numberOfLines != null && numberOfLines > 1 && { WebkitLineClamp: numberOfLines },
    selectable === true && styles.selectable,
    selectable === false && styles.notSelectable,
    onPress && styles.pressable
  ];

  useElementLayout(hostRef, onLayout);
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
  const supportedProps = pickProps(props);
  supportedProps.classList = classList;
  supportedProps.dir = dir;
  // 'auto' by default allows browsers to infer writing direction (root elements only)
  if (!hasTextAncestor) {
    supportedProps.dir = dir != null ? dir : 'auto';
  }
  supportedProps.onClick = handleClick;
  supportedProps.ref = setRef;
  supportedProps.style = style;

  usePlatformMethods(hostRef, supportedProps);

  const element = createElement(component, supportedProps);

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
  selectable: {
    userSelect: 'text'
  },
  pressable: {
    cursor: 'pointer'
  }
});

export default Text;
