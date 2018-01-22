/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export default class WebStyleSheet {
  _cssRules = [];
  _domStyleElement = null;

  constructor(id: string) {
    let _domStyleElement;

    // on the client we check for an existing style sheet before injecting
    if (canUseDOM) {
      _domStyleElement = document.getElementById(id);
      if (!_domStyleElement) {
        const html = `<style id="${id}"></style>`;
        if (document.head) {
          document.head.insertAdjacentHTML('afterbegin', html);
          _domStyleElement = document.getElementById(id);
        }
      }
    }

    this.id = id;
    this._domStyleElement = _domStyleElement;
  }

  containsRule(rule: string): boolean {
    return this._cssRules.indexOf(rule) > -1;
  }

  get cssText(): string {
    return this._cssRules.join('\n');
  }

  insertRuleOnce(rule: string, position: ?number) {
    // prevent duplicate rules
    if (!this.containsRule(rule)) {
      this._cssRules.push(rule);

      // update the native stylesheet (i.e., browser)
      if (this._domStyleElement) {
        // Check whether a rule was part of any prerendered styles (textContent
        // doesn't include styles injected via 'insertRule')
        if (this._domStyleElement.textContent.indexOf(rule) === -1) {
          // $FlowFixMe
          this._domStyleElement.sheet.insertRule(
            rule,
            position || this._domStyleElement.sheet.cssRules.length
          );
        }
      }
    }
  }
}
