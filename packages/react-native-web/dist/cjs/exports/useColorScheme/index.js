"use strict";

exports.__esModule = true;
exports.default = useColorScheme;

var React = _interopRequireWildcard(require("react"));

var _Appearance = _interopRequireDefault(require("../Appearance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function useColorScheme() {
  var _React$useState = React.useState(_Appearance.default.getColorScheme()),
      colorScheme = _React$useState[0],
      setColorScheme = _React$useState[1];

  React.useEffect(function () {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }

    _Appearance.default.addChangeListener(listener);

    return function () {
      return _Appearance.default.removeChangeListener(listener);
    };
  });
  return colorScheme;
}

module.exports = exports.default;