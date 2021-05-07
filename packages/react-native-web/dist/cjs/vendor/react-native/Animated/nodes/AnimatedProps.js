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

var _AnimatedEvent = require("../AnimatedEvent");

var _AnimatedNode2 = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedStyle = _interopRequireDefault(require("./AnimatedStyle"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _findNodeHandle = _interopRequireDefault(require("../../../../exports/findNodeHandle"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimatedProps = /*#__PURE__*/function (_AnimatedNode) {
  _inheritsLoose(AnimatedProps, _AnimatedNode);

  function AnimatedProps(props, callback) {
    var _this;

    _this = _AnimatedNode.call(this) || this;

    if (props.style) {
      props = _objectSpread(_objectSpread({}, props), {}, {
        style: new _AnimatedStyle.default(props.style)
      });
    }

    _this._props = props;
    _this._callback = callback;

    _this.__attach();

    return _this;
  }

  var _proto = AnimatedProps.prototype;

  _proto.__getValue = function __getValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        if (!value.__isNative || value instanceof _AnimatedStyle.default) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          props[key] = value.__getValue();
        }
      } else if (value instanceof _AnimatedEvent.AnimatedEvent) {
        props[key] = value.__getHandler();
      } else {
        props[key] = value;
      }
    }

    return props;
  };

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        props[key] = value.__getAnimatedValue();
      }
    }

    return props;
  };

  _proto.__attach = function __attach() {
    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        value.__addChild(this);
      }
    }
  };

  _proto.__detach = function __detach() {
    if (this.__isNative && this._animatedView) {
      this.__disconnectAnimatedView();
    }

    for (var key in this._props) {
      var value = this._props[key];

      if (value instanceof _AnimatedNode2.default) {
        value.__removeChild(this);
      }
    }

    _AnimatedNode.prototype.__detach.call(this);
  };

  _proto.update = function update() {
    this._callback();
  };

  _proto.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;

      for (var key in this._props) {
        var value = this._props[key];

        if (value instanceof _AnimatedNode2.default) {
          value.__makeNative();
        }
      }

      if (this._animatedView) {
        this.__connectAnimatedView();
      }
    }
  };

  _proto.setNativeView = function setNativeView(animatedView) {
    if (this._animatedView === animatedView) {
      return;
    }

    this._animatedView = animatedView;

    if (this.__isNative) {
      this.__connectAnimatedView();
    }
  };

  _proto.__connectAnimatedView = function __connectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle.default)(this._animatedView);
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');

    _NativeAnimatedHelper.default.API.connectAnimatedNodeToView(this.__getNativeTag(), nativeViewTag);
  };

  _proto.__disconnectAnimatedView = function __disconnectAnimatedView() {
    (0, _invariant.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle.default)(this._animatedView);
    (0, _invariant.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');

    _NativeAnimatedHelper.default.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), nativeViewTag);
  };

  _proto.__restoreDefaultValues = function __restoreDefaultValues() {
    // When using the native driver, view properties need to be restored to
    // their default values manually since react no longer tracks them. This
    // is needed to handle cases where a prop driven by native animated is removed
    // after having been changed natively by an animation.
    if (this.__isNative) {
      _NativeAnimatedHelper.default.API.restoreDefaultValues(this.__getNativeTag());
    }
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    var propsConfig = {};

    for (var propKey in this._props) {
      var value = this._props[propKey];

      if (value instanceof _AnimatedNode2.default) {
        value.__makeNative();

        propsConfig[propKey] = value.__getNativeTag();
      }
    }

    return {
      type: 'props',
      props: propsConfig
    };
  };

  return AnimatedProps;
}(_AnimatedNode2.default);

var _default = AnimatedProps;
exports.default = _default;
module.exports = exports.default;