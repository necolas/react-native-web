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
import filterSupportedProps from '../View/filterSupportedProps';
import setAndForwardRef from '../../modules/setAndForwardRef';
import useElementLayout from '../../hooks/useElementLayout';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import React, { forwardRef, useContext, useRef } from 'react';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';

const Text = forwardRef<TextProps, *>((props, ref) => {
  const { dir, forwardedRef, numberOfLines, onLayout, onPress, selectable } = props;

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

  function createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }

  function createPressHandler(fn) {
    return e => {
      e.stopPropagation();
      fn && fn(e);
    };
  }

  const supportedProps = filterSupportedProps(props);

  if (onPress) {
    supportedProps.accessible = true;
    supportedProps.onClick = createPressHandler(onPress);
    supportedProps.onKeyDown = createEnterHandler(onPress);
  }

  supportedProps.classList = classList;
  // allow browsers to automatically infer the language writing direction
  supportedProps.dir = dir !== undefined ? dir : 'auto';
  supportedProps.ref = setRef;
  supportedProps.style = style;

  const component = hasTextAncestor ? 'span' : 'div';
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
  pressable: {
    cursor: 'pointer'
  }
});

export default Text;
