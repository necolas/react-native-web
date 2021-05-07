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
exports.default = void 0;

var _AnimatedEvent = require("./AnimatedEvent");

var _AnimatedImplementation = _interopRequireDefault(require("./AnimatedImplementation"));

var _AnimatedInterpolation = _interopRequireDefault(require("./nodes/AnimatedInterpolation"));

var _AnimatedNode = _interopRequireDefault(require("./nodes/AnimatedNode"));

var _AnimatedProps = _interopRequireDefault(require("./nodes/AnimatedProps"));

var _AnimatedValue = _interopRequireDefault(require("./nodes/AnimatedValue"));

var _AnimatedValueXY = _interopRequireDefault(require("./nodes/AnimatedValueXY"));

var _createAnimatedComponent = _interopRequireDefault(require("./createAnimatedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyAnimation = {
  start: function start() {},
  stop: function stop() {},
  reset: function reset() {},
  _startNativeLoop: function _startNativeLoop() {},
  _isUsingNativeDriver: function _isUsingNativeDriver() {
    return false;
  }
};

var spring = function spring(value, config) {
  var anyValue = value;
  return _objectSpread(_objectSpread({}, emptyAnimation), {}, {
    start: function start(callback) {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

var timing = function timing(value, config) {
  var anyValue = value;
  return _objectSpread(_objectSpread({}, emptyAnimation), {}, {
    start: function start(callback) {
      anyValue.setValue(config.toValue);
      callback && callback({
        finished: true
      });
    }
  });
};

var decay = function decay(value, config) {
  return emptyAnimation;
};

var sequence = function sequence(animations) {
  return emptyAnimation;
};

var parallel = function parallel(animations, config) {
  return emptyAnimation;
};

var delay = function delay(time) {
  return emptyAnimation;
};

var stagger = function stagger(time, animations) {
  return emptyAnimation;
};

var loop = function loop(animation, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$iterations = _ref.iterations,
      iterations = _ref$iterations === void 0 ? -1 : _ref$iterations;

  return emptyAnimation;
};

var event = function event(argMapping, config) {
  return null;
};

var _default = {
  Value: _AnimatedValue.default,
  ValueXY: _AnimatedValueXY.default,
  Interpolation: _AnimatedInterpolation.default,
  Node: _AnimatedNode.default,
  decay: decay,
  timing: timing,
  spring: spring,
  add: _AnimatedImplementation.default.add,
  subtract: _AnimatedImplementation.default.subtract,
  divide: _AnimatedImplementation.default.divide,
  multiply: _AnimatedImplementation.default.multiply,
  modulo: _AnimatedImplementation.default.modulo,
  diffClamp: _AnimatedImplementation.default.diffClamp,
  delay: delay,
  sequence: sequence,
  parallel: parallel,
  stagger: stagger,
  loop: loop,
  event: event,
  createAnimatedComponent: _createAnimatedComponent.default,
  attachNativeEvent: _AnimatedEvent.attachNativeEvent,
  forkEvent: _AnimatedImplementation.default.forkEvent,
  unforkEvent: _AnimatedImplementation.default.unforkEvent,
  Event: _AnimatedEvent.AnimatedEvent,
  __PropsOnlyForTests: _AnimatedProps.default
};
exports.default = _default;
module.exports = exports.default;