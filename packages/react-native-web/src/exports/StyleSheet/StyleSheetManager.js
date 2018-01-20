/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import generateCss from './generateCss';
import hash from '../../vendor/hash';
import staticCss from './staticCss';

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

// See #513

export default class StyleSheetManager {
  cache = null;
  mainSheet = null;

  constructor() {
    this.cache = {
      byClassName: {},
      byProp: {}
    };

    // on the client we check for an existing style sheet before injecting style sheets
    if (canUseDOM) {
      const prerenderedStyleSheet = document.getElementById(STYLE_ELEMENT_ID);
      if (prerenderedStyleSheet) {
        this.mainSheet = prerenderedStyleSheet;
      } else {
        document.head.insertAdjacentHTML('afterbegin', this.getStyleSheetHtml());
        this.mainSheet = document.getElementById(STYLE_ELEMENT_ID);
      }
    }

    // need to pre-register pointerEvents as they have no inline-style equivalent
    ['box-only', 'box-none', 'auto', 'none'].forEach(v => {
      this.setDeclaration('pointerEvents', v);
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

  getStyleSheetHtml() {
    const styleSheets = this.getStyleSheets();
    return styleSheets
      .map(sheet => {
        return `<style id="${sheet.id}">\n${sheet.textContent}\n</style>`;
      })
      .join('\n');
  }

  getStyleSheets() {
    const cache = this.cache.byProp;

    const mainSheetTextContext = Object.keys(cache)
      .reduce((rules, prop) => {
        Object.keys(cache[prop]).forEach(value => {
          const className = this.getClassName(prop, value);
          const moreRules = createCssRules(`.${className}`, prop, value);
          rules.push(...moreRules);
        });

        return rules;
      }, [])
      .join('\n');

    return [
      {
        id: 'react-native-stylesheet-static',
        textContent: `${staticCss}`
      },
      {
        id: STYLE_ELEMENT_ID,
        textContent: `${mainSheetTextContext}`
      }
    ];
  }

  setDeclaration(prop, value) {
    let className = this.getClassName(prop, value);
    if (!className) {
      className = createClassName(prop, value);
      this._addToCache(className, prop, value);
      if (canUseDOM) {
        const sheet = this.mainSheet.sheet;
        // avoid injecting if the rule already exists (e.g., server rendered, hot reload)
        if (this.mainSheet.textContent.indexOf(className) === -1) {
          const rules = createCssRules(`.${className}`, prop, value);
          rules.forEach(rule => sheet.insertRule(rule, sheet.cssRules.length));
        }
      }
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
