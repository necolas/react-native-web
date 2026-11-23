/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import * as React from 'react';

import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import setPlatformMethods from '../../modules/setPlatformMethods';
import useElementLayout from '../../modules/useElementLayout';
import { useLocaleContext, getLocaleDirection } from '../../modules/useLocale';
import useMergeRefs from '../../modules/useMergeRefs';
import useResponderEvents from '../../modules/useResponderEvents';
import type { PlatformMethods, Nullable } from '../../types';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import type { ViewProps } from './types';

const forwardPropsList = new Set([
  ...forwardedProps.defaultProps,
  ...forwardedProps.accessibilityProps,
  ...forwardedProps.clickProps,
  ...forwardedProps.focusProps,
  ...forwardedProps.keyboardProps,
  ...forwardedProps.mouseProps,
  ...forwardedProps.touchProps,
  ...forwardedProps.styleProps,
  'disabled',
  'href',
  'lang',
  'onScroll',
  'onWheel',
  'pointerEvents'
]);

const View = (
  props: ViewProps & {
    ref?: React.Ref<HTMLElement & PlatformMethods>;
  }
): React.ReactNode => {
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
    onStartShouldSetResponderCapture,
    ref,
    unstable_type
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    React.Children.toArray(props.children).forEach((item) => {
      if (typeof item === 'string') {
        console.error(
          `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`
        );
      }
    });
  }

  const hasTextAncestor = React.useContext(TextAncestorContext);
  const hostRef = React.useRef<Nullable<HTMLElement>>(null);
  const { direction: contextDirection } = useLocaleContext();

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

  let component: 'div' | 'a' = 'div';

  const langDirection =
    props.lang != null ? getLocaleDirection(props.lang) : null;
  const componentDirection = props.dir || langDirection;
  const writingDirection = componentDirection || contextDirection;

  const supportedProps = pick(props, forwardPropsList);
  supportedProps.dir = componentDirection;

  if (
    unstable_type === 'button' ||
    unstable_type === 'reset' ||
    unstable_type === 'submit'
  ) {
    supportedProps.type = unstable_type;
  }

  supportedProps.style = [
    styles.view$raw,
    hasTextAncestor && styles.inline,
    props.style
  ];
  if (props.href != null) {
    component = 'a';
    if (hrefAttrs != null) {
      const { download, rel, target } = hrefAttrs;
      if (download != null) {
        supportedProps.download = download;
      }
      if (rel != null) {
        supportedProps.rel = rel;
      }
      if (typeof target === 'string') {
        supportedProps.target =
          target.charAt(0) !== '_' ? '_' + target : target;
      }
    }
  }

  const setRef = useMergeRefs(hostRef, setPlatformMethods, ref);

  supportedProps.ref = setRef;

  return createElement(component, supportedProps, { writingDirection });
};

View.displayName = 'View';

const styles = StyleSheet.create({
  view$raw: {
    alignContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyle: 'none',
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  }
});

export type { ViewProps };

export default View;
