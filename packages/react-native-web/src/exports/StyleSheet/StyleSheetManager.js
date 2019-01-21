/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createAtomicRules from './createAtomicRules';
import hash from '../../vendor/hash';
import initialRules from './initialRules';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';
import modality from './modality';

const emptyObject = {};
const STYLE_ELEMENT_ID = 'react-native-stylesheet';

const createClassName = (prop, value) => {
  const hashed = hash(prop + normalizeValue(value));
  return process.env.NODE_ENV !== 'production' ? `rn-${prop}-${hashed}` : `rn-${hashed}`;
};

const createCSSStyleSheet = () => {
  const id = STYLE_ELEMENT_ID;

  let element;
  element = document.getElementById(id);
  if (!element) {
    element = document.createElement('style');
    element.setAttribute('id', id);
    const head = document.head;
    if (head) {
      head.insertBefore(element, head.firstChild);
    }
  }
  return element.sheet;
};

const normalizeValue = value => (typeof value === 'object' ? JSON.stringify(value) : value);

export default class StyleSheetManager {
  _cache = {
    byClassName: {},
    byProp: {}
  };

  constructor() {
    this._sheet = createOrderedCSSStyleSheet(canUseDOM ? createCSSStyleSheet() : null);
    modality(rule => this._sheet.insert(rule, 0));
    initialRules.forEach(rule => {
      this._sheet.insert(rule, 0);
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
    const textContent = this._sheet.getTextContent();

    return {
      id: STYLE_ELEMENT_ID,
      textContent
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
        this._sheet.insert(rule, 1);
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
