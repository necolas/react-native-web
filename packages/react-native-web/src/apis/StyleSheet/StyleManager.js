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

const createCssRule = (className, prop, value) => {
  const css = generateCss({ [prop]: value });
  const selector = `.${className}`;
  return `${selector}{${css}}`;
};

const pointerEvents = {
  auto: createClassName('pointerEvents', 'auto'),
  boxNone: createClassName('pointerEvents', 'box-none'),
  boxOnly: createClassName('pointerEvents', 'box-only'),
  none: createClassName('pointerEvents', 'none')
};

// See #513
const pointerEventsCss =
  `.${pointerEvents.auto}{pointer-events:auto !important;}\n` +
  `.${pointerEvents.boxOnly}{pointer-events:auto !important;}\n` +
  `.${pointerEvents.none}{pointer-events:none !important;}\n` +
  `.${pointerEvents.boxNone}{pointer-events:none !important;}\n` +
  `.${pointerEvents.boxNone} > *{pointer-events:auto;}\n` +
  `.${pointerEvents.boxOnly} > *{pointer-events:none;}`;

export default class StyleManager {
  cache = null;
  mainSheet = null;

  constructor() {
    // custom pointer event values are implemented using descendent selectors,
    // so we manually create the CSS and pre-register the declarations
    const pointerEventsPropName = 'pointerEvents';
    this.cache = {
      byClassName: {
        [pointerEvents.auto]: { prop: pointerEventsPropName, value: 'auto' },
        [pointerEvents.boxNone]: {
          prop: pointerEventsPropName,
          value: 'box-none'
        },
        [pointerEvents.boxOnly]: {
          prop: pointerEventsPropName,
          value: 'box-only'
        },
        [pointerEvents.none]: { prop: pointerEventsPropName, value: 'none' }
      },
      byProp: {
        pointerEvents: {
          auto: pointerEvents.auto,
          'box-none': pointerEvents.boxNone,
          'box-only': pointerEvents.boxOnly,
          none: pointerEvents.none
        }
      }
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
        if (prop !== 'pointerEvents') {
          Object.keys(cache[prop]).forEach(value => {
            const className = this.getClassName(prop, value);
            const rule = createCssRule(className, prop, value);
            rules.push(rule);
          });
        }
        return rules;
      }, [])
      .join('\n');

    return [
      {
        id: 'react-native-stylesheet-static',
        textContent: `${staticCss}\n${pointerEventsCss}`
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
          const rule = createCssRule(className, prop, value);
          sheet.insertRule(rule, sheet.cssRules.length);
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
