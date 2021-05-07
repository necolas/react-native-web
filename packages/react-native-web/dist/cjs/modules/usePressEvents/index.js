/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.default = usePressEvents;

var _PressResponder = _interopRequireDefault(require("./PressResponder"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usePressEvents(hostRef, config) {
  var pressResponderRef = (0, _react.useRef)(null);

  if (pressResponderRef.current == null) {
    pressResponderRef.current = new _PressResponder.default(config);
  }

  var pressResponder = pressResponderRef.current; // Re-configure to use the current node and configuration.

  (0, _react.useEffect)(function () {
    pressResponder.configure(config);
  }, [config, pressResponder]); // Reset the `pressResponder` when cleanup needs to occur. This is
  // a separate effect because we do not want to rest the responder when `config` changes.

  (0, _react.useEffect)(function () {
    return function () {
      pressResponder.reset();
    };
  }, [pressResponder]);
  (0, _react.useDebugValue)(config);
  return pressResponder.getEventHandlers();
}

module.exports = exports.default;