/**
 * Based on
 * https://github.com/lelandrichardson/react-primitives/blob/master/src/StyleSheet/injector.js
 */

import asap from 'asap';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const CLASSNAME_REXEP = /\.rn-([^{;\s]+)/g;
const STYLE_ELEMENT_ID = 'react-native-stylesheet';
let registry = {};
let isDirty = false;
let styleNode = null;

const getStyleText = () => {
  /* eslint prefer-template:0 */
  let result = '\n';
  for (const key in registry) {
    if (hasOwnProperty.call(registry, key)) {
      result += registry[key] + '\n';
    }
  }
  return result;
};

// TODO: SSR support
const getAvailableClassNames = () => {
  if (ExecutionEnvironment.canUseDOM) {
    if (!styleNode) {
      styleNode = document.getElementById(STYLE_ELEMENT_ID);
    }
    if (styleNode) {
      const text = styleNode.textContent;
      return text.match(CLASSNAME_REXEP).map((name) => name.slice(1));
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const createStyleHTML = (text) => `<style id="${STYLE_ELEMENT_ID}">${text}</style>`;

const frame = () => {
  if (!isDirty || !ExecutionEnvironment.canUseDOM) { return; }

  isDirty = false;
  styleNode = styleNode || document.getElementById(STYLE_ELEMENT_ID);

  if (!styleNode) {
    document.head.insertAdjacentHTML('afterbegin', createStyleHTML());
    styleNode = document.getElementById(STYLE_ELEMENT_ID);
  }

  const css = getStyleText();

  if (styleNode.styleSheet) {
    styleNode.styleSheet.cssText = css;
  } else {
    /* eslint no-cond-assign:0 */
    let last;
    while (last = styleNode.lastChild) {
      styleNode.removeChild(last);
    }
    styleNode.appendChild(document.createTextNode(css));
  }
};

const addRule = (key, rule) => {
  if (!registry[key]) {
    registry[key] = rule;
    if (!isDirty) {
      isDirty = true;
      if (ExecutionEnvironment.canUseDOM) {
        asap(frame);
      }
    }
  }
};

const getStyleSheetHtml = () => createStyleHTML(getStyleText());

module.exports = {
  addRule,
  getAvailableClassNames,
  getStyleSheetHtml,
  reset: () => { registry = {}; }
};
