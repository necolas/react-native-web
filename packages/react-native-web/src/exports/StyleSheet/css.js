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

const css = {
  create(rules) {
    const result = {};
    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      if (rule.font && rule.font.indexOf('System') > -1) {
        rule.font = rule.font.replace('System', systemFontStack);
      }
      if (rule.fontFamily === 'System') {
        rule.fontFamily = systemFontStack;
      }
      const cssRule = createRuleBlock(rule);
      const className = styleResolver.styleSheetManager.injectRule(key, cssRule);
      result[key] = className;
    });
    return result;
  }
};

export default css;
