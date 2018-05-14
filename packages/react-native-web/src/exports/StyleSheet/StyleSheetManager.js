/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
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
  const hashed = hash(prop + normalizeValue(value));
  return process.env.NODE_ENV !== 'production' ? `rn-${prop}-${hashed}` : `rn-${hashed}`;
};

const normalizeValue = value => (typeof value === 'object' ? JSON.stringify(value) : value);

export default class StyleSheetManager {
  _cache = {
    byClassName: {},
    byProp: {}
  };

  constructor() {
    this._sheet = new WebStyleSheet(STYLE_ELEMENT_ID);
    initialRules.forEach(rule => {
      this._sheet.insertRuleOnce(rule);
    });
  }

  getClassName(prop, value) {
    const val = normalizeValue(value);
    const cache = this._cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  getDeclaration(className) {
    const cache = this._cache.byClassName;
    return cache[className] || emptyObject;
  }

  getStyleSheet() {
    const { cssText } = this._sheet;

    return {
      id: STYLE_ELEMENT_ID,
      textContent: cssText
    };
  }

  injectDeclaration(prop, value): string {
    const val = normalizeValue(value);
    let className = this.getClassName(prop, val);
    if (!className) {
      className = createClassName(prop, val);
      this._addToCache(className, prop, val);
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
