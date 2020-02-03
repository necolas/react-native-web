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

export default function usePlatformMethods(
  hostRef: ElementRef<any>,
  ref: ElementRef<any>,
  classList: Array<string>,
  style: GenericStyleProp<any>
) {
  const previousStyle = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        blur() {
          UIManager.blur(hostRef.current);
        },
        focus() {
          UIManager.focus(hostRef.current);
        },
        measure(callback) {
          UIManager.measure(hostRef.current, callback);
        },
        measureLayout(relativeToNativeNode, onFail, onSuccess) {
          UIManager.measureLayout(hostRef.current, relativeToNativeNode, onFail, onSuccess);
        },
        measureInWindow(callback) {
          UIManager.measureInWindow(hostRef.current, callback);
        },
        setNativeProps(nativeProps) {
          const node = hostRef.current;
          if (node && nativeProps) {
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
      };
    },
    [classList, hostRef, ref, style]
  );
}
