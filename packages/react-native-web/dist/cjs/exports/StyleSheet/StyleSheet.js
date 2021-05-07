"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ReactNativePropRegistry = _interopRequireDefault(require("./ReactNativePropRegistry"));

var _flattenStyle = _interopRequireDefault(require("./flattenStyle"));

var _validate = _interopRequireDefault(require("./validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

var absoluteFill = _ReactNativePropRegistry.default.register(absoluteFillObject);

var StyleSheet = {
  absoluteFill: absoluteFill,
  absoluteFillObject: absoluteFillObject,
  compose: function compose(style1, style2) {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable prefer-rest-params */
      var len = arguments.length;

      if (len > 2) {
        var readableStyles = Array.prototype.slice.call(arguments).map(function (a) {
          return (0, _flattenStyle.default)(a);
        });
        throw new Error("StyleSheet.compose() only accepts 2 arguments, received " + len + ": " + JSON.stringify(readableStyles));
      }
      /* eslint-enable prefer-rest-params */

    }

    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create: function create(styles) {
    var result = {};
    Object.keys(styles).forEach(function (key) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _validate.default)(key, styles);
      }

      var id = styles[key] && _ReactNativePropRegistry.default.register(styles[key]);

      result[key] = id;
    });
    return result;
  },
  flatten: _flattenStyle.default,
  // `hairlineWidth` is not implemented using screen density as browsers may
  // round sub-pixel values down to `0`, causing the line not to be rendered.
  hairlineWidth: 1
};
var _default = StyleSheet;
exports.default = _default;
module.exports = exports.default;