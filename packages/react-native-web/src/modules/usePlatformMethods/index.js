/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import UIManager from '../../exports/UIManager';
import createDOMProps from '../createDOMProps';
import type { ViewProps } from '../../Exports/View';

function setNativeProps(node, nativeProps, classList, pointerEvents, style, previousStyleRef) {
  if (node != null && nativeProps) {
    const domProps = createDOMProps(null, {
      pointerEvents,
      ...nativeProps,
      classList: [classList, nativeProps.className],
      style: [style, nativeProps.style]
    });

    const nextDomStyle = domProps.style;

    if (previousStyleRef.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }
      for (const styleName in previousStyleRef.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyleRef.current = nextDomStyle;

    UIManager.updateView(node, domProps);
  }
}

/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */
export default function usePlatformMethods({
  classList,
  pointerEvents,
  style
}: {
  classList?: Array<string | boolean>,
  style?: $PropertyType<ViewProps, 'style'>,
  pointerEvents: $PropertyType<ViewProps, 'pointerEvents'>
}) {
  const previousStyleRef = React.useRef(null);
  const setNativePropsArgsRef = React.useRef(null);
  setNativePropsArgsRef.current = { classList, pointerEvents, style };

  return React.useCallback(
    (hostNode: any) => {
      if (hostNode != null) {
        hostNode.measure = callback => UIManager.measure(hostNode, callback);
        hostNode.measureLayout = (relativeToNode, success, failure) =>
          UIManager.measureLayout(hostNode, relativeToNode, failure, success);
        hostNode.measureInWindow = callback => UIManager.measureInWindow(hostNode, callback);
        hostNode.setNativeProps = nativeProps => {
          const { classList, style, pointerEvents } = setNativePropsArgsRef.current || {};
          setNativeProps(hostNode, nativeProps, classList, pointerEvents, style, previousStyleRef);
        };
      }
      return hostNode;
    },
    [setNativePropsArgsRef]
  );
}
