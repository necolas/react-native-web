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
    const doc = rootTag?.ownerDocument || document;
    const element = doc.getElementById(id);
    if (element != null) {
      // $FlowFixMe: HTMLElement is incorrectly typed
      return element.sheet;
    } else {
      const element = doc.createElement('style');
      element.setAttribute('id', id);
      const head = doc.head;
      if (head) {
        head.insertBefore(element, head.firstChild);
      }
      return element.sheet;
    }
  } else {
    return null;
  }
}
