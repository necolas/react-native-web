/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import modality from './modality';

export default class WebStyleSheet {
  _cssRules = [];
  _sheet = null;
  _textContent = '';

  constructor(id: string) {
    let domStyleElement;

    // on the client we check for an existing style sheet before injecting
    if (canUseDOM) {
      domStyleElement = document.getElementById(id);
      if (!domStyleElement) {
        const html = `<style id="${id}"></style>`;
        if (document.head) {
          document.head.insertAdjacentHTML('afterbegin', html);
          domStyleElement = document.getElementById(id);
        }
      }

      if (domStyleElement) {
        modality(domStyleElement);
        // $FlowFixMe
        this._sheet = domStyleElement.sheet;
        this._textContent = domStyleElement.textContent;
      }
    }
  }

  containsRule(rule: string): boolean {
    return this._cssRules.indexOf(rule) > -1;
  }

  get cssText(): string {
    return this._cssRules.join('\n');
  }

  insertRuleOnce(rule: string, position: ?number) {
    // Reduce chance of duplicate rules
    if (!this.containsRule(rule)) {
      this._cssRules.push(rule);

      // Check whether a rule was part of any prerendered styles (textContent
      // doesn't include styles injected via 'insertRule')
      if (this._textContent.indexOf(rule) === -1 && this._sheet) {
        const pos = position || this._sheet.cssRules.length;
        this._sheet.insertRule(rule, pos);
      }
    }
  }
}
