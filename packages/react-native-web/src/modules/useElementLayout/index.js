/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { LayoutEvent } from '../../types';

import { useLayoutEffect } from 'react';
import UIManager from '../../exports/UIManager';
import canUseDOM from '../canUseDom';

const DOM_LAYOUT_HANDLER_NAME = '__reactLayoutHandler';

type LayoutHandlerNode = HTMLElement & {
  __reactLayoutHandler?: ?(e: LayoutEvent) => void,
  ...
};

let resizeObserver: ?ResizeObserver = null;

function getResizeObserver(): ?ResizeObserver {
  if (canUseDOM && typeof window.ResizeObserver !== 'undefined') {
    if (resizeObserver == null) {
      resizeObserver = new window.ResizeObserver((entries) => {
        entries.forEach((entry) => {
          // $FlowFixMe[incompatible-type] observed nodes are host nodes
          const node: LayoutHandlerNode = entry.target;
          const onLayout = node[DOM_LAYOUT_HANDLER_NAME];

          if (typeof onLayout === 'function') {
            // We still need to measure the view because browsers don't yet provide
            // border-box dimensions in the entry
            UIManager.measure(node, (x, y, width, height) => {
              const event: LayoutEvent = {
                nativeEvent: { layout: { x, y, width, height } },
                timeStamp: Date.now()
              };
              Object.defineProperty(event.nativeEvent, 'target', {
                enumerable: true,
                get: () => entry.target
              });
              onLayout(event);
            });
          }
        });
      });
    }
  }

  return resizeObserver;
}

export default function useElementLayout(
  ref: { readonly current: ?LayoutHandlerNode },
  onLayout?: ?(e: LayoutEvent) => void
) {
  const observer = getResizeObserver();

  useLayoutEffect(() => {
    const node = ref.current;

    if (
      node != null &&
      (onLayout != null || node[DOM_LAYOUT_HANDLER_NAME] != null)
    ) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]);

  // Observing is done in a separate effect to avoid this effect running
  // when 'onLayout' changes.
  useLayoutEffect(() => {
    const node = ref.current;
    if (
      node != null &&
      observer != null &&
      typeof node[DOM_LAYOUT_HANDLER_NAME] === 'function'
    ) {
      observer.observe(node);
      return () => {
        observer.unobserve(node);
      };
    }
  }, [ref, observer]);
}
