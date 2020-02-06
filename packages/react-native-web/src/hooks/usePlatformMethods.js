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
import TextInputState from '../modules/TextInputState';

function setNativeProps(node, nativeProps, classList, style, previousStyle) {
  if (node != null && nativeProps) {
    const domProps = createDOMProps(null, {
      ...nativeProps,
      classList: [nativeProps.className, classList],
      style: [style, nativeProps.style]
    });

    const nextDomStyle = domProps.style;

    if (previousStyle.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }
      for (const styleName in previousStyle.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyle.current = nextDomStyle;

    UIManager.updateView(node, domProps);
  }
}

export default function usePlatformMethods(
  hostRef: ElementRef<any>,
  ref: ElementRef<any>,
  classList: Array<boolean | string>,
  style: GenericStyleProp<any>,
  extras: any
) {
  const previousStyle = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      const hostNode = hostRef.current;
      return {
        blur() {
          UIManager.blur(hostNode);
        },
        focus() {
          UIManager.focus(hostNode);
        },
        measure(callback) {
          UIManager.measure(hostNode, callback);
        },
        measureLayout(relativeToNativeNode, onFail, onSuccess) {
          UIManager.measureLayout(hostNode, relativeToNativeNode, onFail, onSuccess);
        },
        measureInWindow(callback) {
          UIManager.measureInWindow(hostNode, callback);
        },
        setNativeProps(nativeProps) {
          setNativeProps(hostNode, nativeProps, classList, style, previousStyle);
        }
      };
    },
    [classList, hostRef, style]
  );
}

export function usePlatformInputMethods(
  hostRef: ElementRef<any>,
  ref: ElementRef<any>,
  classList: Array<boolean | string>,
  style: GenericStyleProp<any>,
  extras: any
) {
  const previousStyle = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      const hostNode = hostRef.current;
      return {
        blur() {
          UIManager.blur(hostNode);
        },
        clear() {
          if (hostNode != null) {
            hostNode.value = '';
          }
        },
        focus() {
          UIManager.focus(hostNode);
        },
        isFocused() {
          return hostNode != null && TextInputState.currentlyFocusedField() === hostNode;
        },
        measure(callback) {
          UIManager.measure(hostNode, callback);
        },
        measureLayout(relativeToNativeNode, onFail, onSuccess) {
          UIManager.measureLayout(hostNode, relativeToNativeNode, onFail, onSuccess);
        },
        measureInWindow(callback) {
          UIManager.measureInWindow(hostNode, callback);
        },
        setNativeProps(nativeProps) {
          setNativeProps(hostNode, nativeProps, classList, style, previousStyle);
        }
      };
    },
    [classList, hostRef, style]
  );
}
