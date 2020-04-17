/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { GenericStyleProp } from '../types';
import type { ElementRef } from 'react';

import UIManager from '../exports/UIManager';
import createDOMProps from '../modules/createDOMProps';
import { useImperativeHandle, useRef } from 'react';

function setNativeProps(node, nativeProps, classList, style, previousStyleRef) {
  if (node != null && nativeProps) {
    const domProps = createDOMProps(null, {
      ...nativeProps,
      classList: [nativeProps.className, classList],
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
export default function usePlatformMethods(
  hostRef: ElementRef<any>,
  classList: Array<boolean | string>,
  style: GenericStyleProp<any>
) {
  const previousStyleRef = useRef(null);

  useImperativeHandle(
    hostRef,
    () => {
      const hostNode = hostRef.current;
      hostNode.measure = callback => UIManager.measure(hostNode, callback);
      hostNode.measureLayout = (relativeToNode, success, failure) =>
        UIManager.measureLayout(hostNode, relativeToNode, success, failure);
      hostNode.measureInWindow = callback => UIManager.measureInWindow(hostNode, callback);
      hostNode.setNativeProps = nativeProps =>
        setNativeProps(hostNode, nativeProps, classList, style, previousStyleRef);
      return hostNode;
    },
    [classList, hostRef, style]
  );
}
