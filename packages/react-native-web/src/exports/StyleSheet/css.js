/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { classic } from './compile';
import styleResolver from './styleResolver';
import { STYLE_GROUPS } from './constants';

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
    Object.keys(rules).forEach(name => {
      const style = rules[name];
      const compiled = classic(style, name);

      Object.values(compiled).forEach(({ identifier, rules }) => {
        rules.forEach(rule => {
          styleResolver.sheet.insert(rule, STYLE_GROUPS.classic);
        });
        result[name] = identifier;
      });
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
