/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

/* eslint no-bitwise: 0 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _normalizeCssColor = _interopRequireDefault(require("normalize-css-color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __DEV__ = process.env.NODE_ENV !== 'production';

var linear = function linear(t) {
  return t;
};
/**
 * Very handy helper to map input ranges to output ranges with an easing
 * function and custom behavior outside of the ranges.
 */


function createInterpolation(config) {
  if (config.outputRange && typeof config.outputRange[0] === 'string') {
    return createInterpolationFromStringOutputRange(config);
  }

  var outputRange = config.outputRange;
  checkInfiniteRange('outputRange', outputRange);
  var inputRange = config.inputRange;
  checkInfiniteRange('inputRange', inputRange);
  checkValidInputRange(inputRange);
  (0, _invariant.default)(inputRange.length === outputRange.length, 'inputRange (' + inputRange.length + ') and outputRange (' + outputRange.length + ') must have the same length');
  var easing = config.easing || linear;
  var extrapolateLeft = 'extend';

  if (config.extrapolateLeft !== undefined) {
    extrapolateLeft = config.extrapolateLeft;
  } else if (config.extrapolate !== undefined) {
    extrapolateLeft = config.extrapolate;
  }

  var extrapolateRight = 'extend';

  if (config.extrapolateRight !== undefined) {
    extrapolateRight = config.extrapolateRight;
  } else if (config.extrapolate !== undefined) {
    extrapolateRight = config.extrapolate;
  }

  return function (input) {
    (0, _invariant.default)(typeof input === 'number', 'Cannot interpolation an input which is not a number');
    var range = findRange(input, inputRange);
    return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight);
  };
}

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight) {
  var result = input; // Extrapolate

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') {
      return result;
    } else if (extrapolateLeft === 'clamp') {
      result = inputMin;
    } else if (extrapolateLeft === 'extend') {// noop
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') {
      return result;
    } else if (extrapolateRight === 'clamp') {
      result = inputMax;
    } else if (extrapolateRight === 'extend') {// noop
    }
  }

  if (outputMin === outputMax) {
    return outputMin;
  }

  if (inputMin === inputMax) {
    if (input <= inputMin) {
      return outputMin;
    }

    return outputMax;
  } // Input Range


  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  } // Easing


  result = easing(result); // Output Range

  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result = result + outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
}

function colorToRgba(input) {
  var normalizedColor = (0, _normalizeCssColor.default)(input);

  if (normalizedColor === null || typeof normalizedColor !== 'number') {
    return input;
  }

  normalizedColor = normalizedColor || 0;
  var r = (normalizedColor & 0xff000000) >>> 24;
  var g = (normalizedColor & 0x00ff0000) >>> 16;
  var b = (normalizedColor & 0x0000ff00) >>> 8;
  var a = (normalizedColor & 0x000000ff) / 255;
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

var stringShapeRegex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36) // colors
 *   -45deg                  // values with units
 */

function createInterpolationFromStringOutputRange(config) {
  var outputRange = config.outputRange;
  (0, _invariant.default)(outputRange.length >= 2, 'Bad output range');
  outputRange = outputRange.map(colorToRgba);
  checkPattern(outputRange); // ['rgba(0, 100, 200, 0)', 'rgba(50, 150, 250, 0.5)']
  // ->
  // [
  //   [0, 50],
  //   [100, 150],
  //   [200, 250],
  //   [0, 0.5],
  // ]

  /* $FlowFixMe(>=0.18.0): `outputRange[0].match()` can return `null`. Need to
   * guard against this possibility.
   */

  var outputRanges = outputRange[0].match(stringShapeRegex).map(function () {
    return [];
  });
  outputRange.forEach(function (value) {
    /* $FlowFixMe(>=0.18.0): `value.match()` can return `null`. Need to guard
     * against this possibility.
     */
    value.match(stringShapeRegex).forEach(function (number, i) {
      outputRanges[i].push(+number);
    });
  });
  var interpolations = outputRange[0].match(stringShapeRegex)
  /* $FlowFixMe(>=0.18.0): `outputRange[0].match()` can return `null`. Need
   * to guard against this possibility. */
  .map(function (value, i) {
    return createInterpolation(_objectSpread(_objectSpread({}, config), {}, {
      outputRange: outputRanges[i]
    }));
  }); // rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
  // round the opacity (4th column).

  var shouldRound = isRgbOrRgba(outputRange[0]);
  return function (input) {
    var i = 0; // 'rgba(0, 100, 200, 0)'
    // ->
    // 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'

    return outputRange[0].replace(stringShapeRegex, function () {
      var val = +interpolations[i++](input);

      if (shouldRound) {
        val = i < 4 ? Math.round(val) : Math.round(val * 1000) / 1000;
      }

      return String(val);
    });
  };
}

function isRgbOrRgba(range) {
  return typeof range === 'string' && range.startsWith('rgb');
}

function checkPattern(arr) {
  var pattern = arr[0].replace(stringShapeRegex, '');

  for (var i = 1; i < arr.length; ++i) {
    (0, _invariant.default)(pattern === arr[i].replace(stringShapeRegex, ''), 'invalid pattern ' + arr[0] + ' and ' + arr[i]);
  }
}

function findRange(input, inputRange) {
  var i;

  for (i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }

  return i - 1;
}

function checkValidInputRange(arr) {
  (0, _invariant.default)(arr.length >= 2, 'inputRange must have at least 2 elements');

  for (var i = 1; i < arr.length; ++i) {
    (0, _invariant.default)(arr[i] >= arr[i - 1],
    /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
     * one or both of the operands may be something that doesn't cleanly
     * convert to a string, like undefined, null, and object, etc. If you really
     * mean this implicit string conversion, you can do something like
     * String(myThing)
     */
    'inputRange must be monotonically non-decreasing ' + arr);
  }
}

function checkInfiniteRange(name, arr) {
  (0, _invariant.default)(arr.length >= 2, name + ' must have at least 2 elements');
  (0, _invariant.default)(arr.length !== 2 || arr[0] !== -Infinity || arr[1] !== Infinity,
  /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
   * one or both of the operands may be something that doesn't cleanly convert
   * to a string, like undefined, null, and object, etc. If you really mean
   * this implicit string conversion, you can do something like
   * String(myThing)
   */
  name + 'cannot be ]-infinity;+infinity[ ' + arr);
}

var AnimatedInterpolation = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedInterpolation, _AnimatedWithChildren);

  // Export for testing.
  function AnimatedInterpolation(parent, config) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._parent = parent;
    _this._config = config;
    _this._interpolation = createInterpolation(config);
    return _this;
  }

  var _proto = AnimatedInterpolation.prototype;

  _proto.__makeNative = function __makeNative() {
    this._parent.__makeNative();

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.__getValue = function __getValue() {
    var parentValue = this._parent.__getValue();

    (0, _invariant.default)(typeof parentValue === 'number', 'Cannot interpolate an input which is not a number.');
    return this._interpolation(parentValue);
  };

  _proto.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
  };

  _proto.__attach = function __attach() {
    this._parent.__addChild(this);
  };

  _proto.__detach = function __detach() {
    this._parent.__removeChild(this);

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__transformDataType = function __transformDataType(range) {
    return range.map(_NativeAnimatedHelper.default.transformDataType);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    if (__DEV__) {
      _NativeAnimatedHelper.default.validateInterpolation(this._config);
    }

    return {
      inputRange: this._config.inputRange,
      // Only the `outputRange` can contain strings so we don't need to transform `inputRange` here

      /* $FlowFixMe(>=0.38.0) - Flow error detected during the deployment of
       * v0.38.0. To see the error, remove this comment and run flow */
      outputRange: this.__transformDataType(this._config.outputRange),
      extrapolateLeft: this._config.extrapolateLeft || this._config.extrapolate || 'extend',
      extrapolateRight: this._config.extrapolateRight || this._config.extrapolate || 'extend',
      type: 'interpolation'
    };
  };

  return AnimatedInterpolation;
}(_AnimatedWithChildren2.default);

AnimatedInterpolation.__createInterpolation = createInterpolation;
var _default = AnimatedInterpolation;
exports.default = _default;
module.exports = exports.default;