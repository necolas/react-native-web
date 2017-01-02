/**
 * Based on
 * https://github.com/lelandrichardson/react-primitives/blob/master/src/StyleSheet/injector.js
 */

import asap from 'asap';

const emptyObject = {};
const hasOwnProperty = Object.prototype.hasOwnProperty;

const CLASSNAME_REXEP = /\.rn-([^{;\s]+)/g;
const STYLE_ELEMENT_ID = 'react-native-stylesheet';

let registry = {};
let isDirty = false;

/**
 * Registers a rule and requests an update to the style sheet
 */
const addRule = (key, rule) => {
  if (!registry[key]) {
    registry[key] = rule;
    isDirty = true;
    if (global.document) {
      asap(frame);
    }
  }
};

/**
 * Returns a string of the registered rules
 */
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

/**
 * Returns an HTML string for server rendering
 */
const getStyleSheetHtml = () => `<style id="${STYLE_ELEMENT_ID}">${getStyleText()}</style>`;

const reset = () => { registry = {}; };

/**
 * Finds or injects the style sheet when in a browser environment
 */
let styleNode = null;
const getStyleNode = () => {
  if (global.document) {
    if (!styleNode) {
      // look for existing style sheet (could also be server-rendered)
      styleNode = document.getElementById(STYLE_ELEMENT_ID);
      if (!styleNode) {
        // if there is no existing stylesheet, inject it style sheet
        document.head.insertAdjacentHTML('afterbegin', getStyleSheetHtml());
        styleNode = document.getElementById(STYLE_ELEMENT_ID);
      }
    }
    return styleNode;
  }
};

/**
 * Determines which classes are available in the existing document. Doesn't
 * rely on the registry so it can be used to read class names from a SSR style
 * sheet.
 */
const getClassNames = () => {
  const styleNode = getStyleNode();
  if (styleNode) {
    const text = styleNode.textContent;
    const matches = text.match(CLASSNAME_REXEP);
    if (matches) {
      return matches.map((name) => name.slice(1)).reduce((classMap, className) => {
        classMap[className] = true;
        return classMap;
      }, {});
    }
  }
  return emptyObject;
};

const frame = () => {
  if (!isDirty || !global.document) { return; }
  isDirty = false;

  const styleNode = getStyleNode();
  if (styleNode) {
    const css = getStyleText();
    styleNode.textContent = css;
  }
};

module.exports = {
  addRule,
  getClassNames,
  getStyleSheetHtml,
  reset
};
