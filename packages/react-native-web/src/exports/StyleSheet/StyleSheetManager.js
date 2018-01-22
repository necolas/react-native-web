/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import generateCss from './generateCss';
import hash from '../../vendor/hash';
import initialRules from './initialRules';
import WebStyleSheet from './WebStyleSheet';

const emptyObject = {};
const STYLE_ELEMENT_ID = 'react-native-stylesheet';

const createClassName = (prop, value) => {
  const hashed = hash(prop + value);
  return process.env.NODE_ENV !== 'production' ? `rn-${prop}-${hashed}` : `rn-${hashed}`;
};

const createCssRules = (selector, prop, value) => {
  const rules = [];
  let v = value;

  // pointerEvents is a special case that requires custom values and additional css rules
  // See #513
  if (prop === 'pointerEvents') {
    if (value === 'auto' || value === 'box-only') {
      v = 'auto !important';
      if (value === 'box-only') {
        const css = generateCss({ [prop]: 'none' });
        rules.push(`${selector} > *{${css}}`);
      }
    } else if (value === 'none' || value === 'box-none') {
      v = 'none !important';
      if (value === 'box-none') {
        const css = generateCss({ [prop]: 'auto' });
        rules.push(`${selector} > *{${css}}`);
      }
    }
  }

  const css = generateCss({ [prop]: v });
  rules.push(`${selector}{${css}}`);

  return rules;
};

export default class StyleSheetManager {
  cache = null;
  _webStyleSheet = null;

  constructor() {
    this.cache = {
      byClassName: {},
      byProp: {}
    };

    this._webStyleSheet = new WebStyleSheet(STYLE_ELEMENT_ID);
    initialRules.forEach(rule => {
      this._webStyleSheet.insertRuleOnce(rule);
    });
  }

  getClassName(prop, value) {
    const cache = this.cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(value) && cache[prop][value];
  }

  getDeclaration(className) {
    const cache = this.cache.byClassName;
    return cache[className] || emptyObject;
  }

  getStyleSheets() {
    const { cssText } = this._webStyleSheet;

    return [
      {
        id: STYLE_ELEMENT_ID,
        textContent: cssText
      }
    ];
  }

  setDeclaration(prop, value) {
    let className = this.getClassName(prop, value);
    if (!className) {
      className = createClassName(prop, value);
      this._addToCache(className, prop, value);
      const rules = createCssRules(`.${className}`, prop, value);
      rules.forEach(rule => {
        this._webStyleSheet.insertRuleOnce(rule);
      });
    }
    return className;
  }

  _addToCache(className, prop, value) {
    const cache = this.cache;
    if (!cache.byProp[prop]) {
      cache.byProp[prop] = {};
    }
    cache.byProp[prop][value] = className;
    cache.byClassName[className] = { prop, value };
  }
}
