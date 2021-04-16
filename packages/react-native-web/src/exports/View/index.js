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
import TextAncestorContext from '../Text/TextAncestorContext';

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
  onScroll: true,
  onWheel: true,
  pointerEvents: true
};

const pickProps = (props) => pick(props, forwardPropsList);

const View = forwardRef<ViewProps, *>((props, forwardedRef) => {
  const {
    hrefAttrs,
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
    onStartShouldSetResponderCapture
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(props.children).forEach((item) => {
      if (typeof item === 'string') {
        console.error(`Unexpected text node: ${item}. A text node cannot be a child of a <View>.`);
      }
    });
  }

  const hasTextAncestor = useContext(TextAncestorContext);
  const hostRef = useRef(null);

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

  const style = StyleSheet.compose(hasTextAncestor && styles.inline, props.style);

  const supportedProps = pickProps(props);
  supportedProps.classList = classList;
  supportedProps.style = style;
  if (props.href != null && hrefAttrs != null) {
    const { download, rel, target } = hrefAttrs;
    if (download != null) {
      supportedProps.download = download;
    }
    if (rel != null) {
      supportedProps.rel = rel;
    }
    if (typeof target === 'string') {
      supportedProps.target = target.charAt(0) !== '_' ? '_' + target : target;
    }
  }

  const platformMethodsRef = usePlatformMethods(supportedProps);
  const setRef = useMergeRefs(hostRef, platformMethodsRef, forwardedRef);

  supportedProps.ref = setRef;

  return createElement('div', supportedProps);
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
  }
});

const classList = [classes.view];

const styles = StyleSheet.create({
  inline: {
    display: 'inline-flex'
  }
});

export type { ViewProps };

export default View;
