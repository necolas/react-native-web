/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import createRuleBlock from './createRuleBlock';
import styleResolver from './styleResolver';
import { systemFontStack } from './constants';

const fontFamilyProperties = ['font', 'fontFamily'];
/**
 * A simple (and dangerous) CSS system.
 * The order of CSS rule insertion is not guaranteed.
 * Avoiding combining 2 or more classes that modify the same property.
 */
const css = {
  /**
   * const classes = css.create({ base: {}, extra: {} })
   */
  create(rules) {
    const result = {};
    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      fontFamilyProperties.forEach(prop => {
        const value = rule[prop];
        if (value && value.indexOf('System') > -1) {
          rule[prop] = value.replace('System', systemFontStack);
        }
      });
      const cssRule = createRuleBlock(rule);
      const className = styleResolver.styleSheetManager.injectRule(key, cssRule);
      result[key] = className;
    });
    return result;
  },
  /**
   * css.combine(classes.base, classes.extra)
   */
  combine(...args) {
    return args.reduce((className, value) => {
      if (value) {
        className += className.length > 0 ? ' ' + value : value;
      }
      return className;
    }, '');
  }
};

export default css;
