/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Interpolation
 * 
 */
/* eslint no-bitwise: 0 */
'use strict';

/* @edit start */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var normalizeColor = require('../StyleSheet/normalizeColor');
var invariant = require('fbjs/lib/invariant');
/* @edit end */

var linear = function linear(t) {
  return t;
};

/**
 * Very handy helper to map input ranges to output ranges with an easing
 * function and custom behavior outside of the ranges.
 */

var Interpolation = function () {
  function Interpolation() {
    _classCallCheck(this, Interpolation);
  }

  _createClass(Interpolation, null, [{
    key: 'create',
    value: function create(config) {

      if (config.outputRange && typeof config.outputRange[0] === 'string') {
        return createInterpolationFromStringOutputRange(config);
      }

      var outputRange = config.outputRange;
      checkInfiniteRange('outputRange', outputRange);

      var inputRange = config.inputRange;
      checkInfiniteRange('inputRange', inputRange);
      checkValidInputRange(inputRange);

      invariant(inputRange.length === outputRange.length, 'inputRange (' + inputRange.length + ') and outputRange (' + outputRange.length + ') must have the same length');

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
        invariant(typeof input === 'number', 'Cannot interpolation an input which is not a number');

        var range = findRange(input, inputRange);
        return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight);
      };
    }
  }]);

  return Interpolation;
}();

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight) {
  var result = input;

  // Extrapolate
  if (result < inputMin) {
    if (extrapolateLeft === 'identity') {
      return result;
    } else if (extrapolateLeft === 'clamp') {
      result = inputMin;
    } else if (extrapolateLeft === 'extend') {
      // noop
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') {
      return result;
    } else if (extrapolateRight === 'clamp') {
      result = inputMax;
    } else if (extrapolateRight === 'extend') {
      // noop
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
  }

  // Input Range
  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  }

  // Easing
  result = easing(result);

  // Output Range
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
  var int32Color = normalizeColor(input);
  if (int32Color === null) {
    return input;
  }

  int32Color = int32Color || 0; // $FlowIssue

  var r = (int32Color & 0xff000000) >>> 24;
  var g = (int32Color & 0x00ff0000) >>> 16;
  var b = (int32Color & 0x0000ff00) >>> 8;
  var a = (int32Color & 0x000000ff) / 255;

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

var stringShapeRegex = /[0-9\.-]+/g;

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
  invariant(outputRange.length >= 2, 'Bad output range');
  outputRange = outputRange.map(colorToRgba);
  checkPattern(outputRange);

  // ['rgba(0, 100, 200, 0)', 'rgba(50, 150, 250, 0.5)']
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

  /* $FlowFixMe(>=0.18.0): `outputRange[0].match()` can return `null`. Need to
   * guard against this possibility.
   */
  var interpolations = outputRange[0].match(stringShapeRegex).map(function (value, i) {
    return Interpolation.create(_extends({}, config, {
      outputRange: outputRanges[i]
    }));
  });

  return function (input) {
    var i = 0;
    // 'rgba(0, 100, 200, 0)'
    // ->
    // 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'
    return outputRange[0].replace(stringShapeRegex, function () {
      return String(interpolations[i++](input));
    });
  };
}

function checkPattern(arr) {
  var pattern = arr[0].replace(stringShapeRegex, '');
  for (var i = 1; i < arr.length; ++i) {
    invariant(pattern === arr[i].replace(stringShapeRegex, ''), 'invalid pattern ' + arr[0] + ' and ' + arr[i]);
  }
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}

function checkValidInputRange(arr) {
  invariant(arr.length >= 2, 'inputRange must have at least 2 elements');
  for (var i = 1; i < arr.length; ++i) {
    invariant(arr[i] >= arr[i - 1],
    /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
     * one or both of the operands may be something that doesn't cleanly
     * convert to a string, like undefined, null, and object, etc. If you really
     * mean this implicit string conversion, you can do something like
     * String(myThing)
     */
    'inputRange must be monotonically increasing ' + arr);
  }
}

function checkInfiniteRange(name, arr) {
  invariant(arr.length >= 2, name + ' must have at least 2 elements');
  invariant(arr.length !== 2 || arr[0] !== -Infinity || arr[1] !== Infinity,
  /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
   * one or both of the operands may be something that doesn't cleanly convert
   * to a string, like undefined, null, and object, etc. If you really mean
   * this implicit string conversion, you can do something like
   * String(myThing)
   */
  name + 'cannot be ]-infinity;+infinity[ ' + arr);
}

module.exports = Interpolation;