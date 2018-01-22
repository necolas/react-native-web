/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import createAtomicRules from './createAtomicRules';
import hash from '../../vendor/hash';
import initialRules from './initialRules';
import WebStyleSheet from './WebStyleSheet';

const emptyObject = {};
const STYLE_ELEMENT_ID = 'react-native-stylesheet';

const createClassName = (prop, value) => {
  const hashed = hash(prop + value);
  return process.env.NODE_ENV !== 'production' ? `rn-${prop}-${hashed}` : `rn-${hashed}`;
};

export default class StyleSheetManager {
  _cache = {
    byClassName: {},
    byProp: {}
  };

  constructor(id) {
    this._id = this._sheet = new WebStyleSheet(STYLE_ELEMENT_ID);
    initialRules.forEach(rule => {
      this._sheet.insertRuleOnce(rule);
    });
  }

  getClassName(prop, value) {
    const cache = this._cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(value) && cache[prop][value];
  }

  getDeclaration(className) {
    const cache = this._cache.byClassName;
    return cache[className] || emptyObject;
  }

  getStyleSheets() {
    const { cssText } = this._sheet;

    return [
      {
        id: STYLE_ELEMENT_ID,
        textContent: cssText
      }
    ];
  }

  injectDeclaration(prop, value): string {
    let className = this.getClassName(prop, value);
    if (!className) {
      className = createClassName(prop, value);
      this._addToCache(className, prop, value);
      const rules = createAtomicRules(`.${className}`, prop, value);
      rules.forEach(rule => {
        this._sheet.insertRuleOnce(rule);
      });
    }
    return className;
  }

  _addToCache(className, prop, value) {
    const cache = this._cache;
    if (!cache.byProp[prop]) {
      cache.byProp[prop] = {};
    }
    cache.byProp[prop][value] = className;
    cache.byClassName[className] = { prop, value };
  }
}
