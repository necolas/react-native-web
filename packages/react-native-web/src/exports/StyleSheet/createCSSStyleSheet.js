/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

// $FlowFixMe: HTMLStyleElement is incorrectly typed - https://github.com/facebook/flow/issues/2696
export default function createCSSStyleSheet(id: string, rootTag?: HTMLElement): ?CSSStyleSheet {
  if (canUseDOM) {
    let root = document;
    if (rootTag && rootTag.getRootNode() instanceof ShadowRoot) {
      root = rootTag.getRootNode();
    }
    // $FlowFixMe: both document and ShadowRoot have getElementById
    const element = root.getElementById(id);
    if (element != null) {
      // $FlowFixMe: HTMLElement is incorrectly typed
      return element.sheet;
    } else {
      const element = document.createElement('style');
      element.setAttribute('id', id);

      if (root instanceof ShadowRoot) {
        root.insertBefore(element, root.firstChild);
      } else {
        const head = document.head;
        if (head) {
          head.insertBefore(element, head.firstChild);
        }
      }
      return element.sheet;
    }
  } else {
    return null;
  }
}
