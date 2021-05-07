"use strict";

exports.__esModule = true;
exports.default = void 0;

var _styleResolver = _interopRequireDefault(require("./styleResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * A simple (and dangerous) CSS system.
 * The order of CSS rule insertion is not guaranteed.
 * Avoiding combining 2 or more classes that modify the same property.
 */
var css = {
  /**
   * const classes = css.create({ base: {}, extra: {} })
   */
  create: function create(rules, group) {
    return _styleResolver.default.createCSS(rules, group);
  }
};
var _default = css;
exports.default = _default;
module.exports = exports.default;