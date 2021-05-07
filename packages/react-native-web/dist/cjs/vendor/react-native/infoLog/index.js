/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Intentional info-level logging for clear separation from ad-hoc console debug logging.
 */

exports.__esModule = true;
exports.default = void 0;

function infoLog() {
  var _console;

  return (_console = console).log.apply(_console, arguments);
}

var _default = infoLog;
exports.default = _default;
module.exports = exports.default;