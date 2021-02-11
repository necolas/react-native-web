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
import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import useElementLayout from '../../modules/useElementLayout';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import useResponderEvents from '../../modules/useResponderEvents';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';

const forwardPropsList = {
  ...forwardedProps.defaultProps,
  ...forwardedProps.accessibilityProps,
  ...forwardedProps.clickProps,
  ...forwardedProps.focusProps,
  ...forwardedProps.keyboardProps,
  ...forwardedProps.mouseProps,
  ...forwardedProps.touchProps,
  ...forwardedProps.styleProps,
  href: true,
  lang: true,
  pointerEvents: true
};

const pickProps = (props) => pick(props, forwardPropsList);

const Text = forwardRef<TextProps, *>((props, forwardedRef) => {
  const {
    dir,
    hrefAttrs,
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
  supportedProps.style = style;
  if (props.href != null && hrefAttrs != null) {
    const { download, rel, target } = hrefAttrs;
    if (download != null) {
      supportedProps.download = download;
    }
    if (rel != null) {
      supportedProps.rel = rel;
    }
    if (typeof target === 'string' && target.charAt(0) !== '_') {
      supportedProps.target = '_' + target;
    }
  }

  const platformMethodsRef = usePlatformMethods(supportedProps);
  const setRef = useMergeRefs(hostRef, platformMethodsRef, forwardedRef);

  supportedProps.ref = setRef;

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
