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

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NativeAnimatedAPI = _NativeAnimatedHelper.default.API;
var _uniqueId = 1; // Note(vjeux): this would be better as an interface but flow doesn't
// support them yet

var AnimatedNode = /*#__PURE__*/function () {
  var _proto = AnimatedNode.prototype;

  _proto.__attach = function __attach() {};

  _proto.__detach = function __detach() {
    if (this.__isNative && this.__nativeTag != null) {
      _NativeAnimatedHelper.default.API.dropAnimatedNode(this.__nativeTag);

      this.__nativeTag = undefined;
    }
  };

  _proto.__getValue = function __getValue() {};

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    return this.__getValue();
  };

  _proto.__addChild = function __addChild(child) {};

  _proto.__removeChild = function __removeChild(child) {};

  _proto.__getChildren = function __getChildren() {
    return [];
  }
  /* Methods and props used by native Animated impl */
  ;

  function AnimatedNode() {
    this._listeners = {};
  }

  _proto.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      throw new Error('This node cannot be made a "native" animated node');
    }

    if (this.hasListeners()) {
      this._startListeningToNativeValueUpdates();
    }
  }
  /**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#addlistener
   */
  ;

  _proto.addListener = function addListener(callback) {
    var id = String(_uniqueId++);
    this._listeners[id] = callback;

    if (this.__isNative) {
      this._startListeningToNativeValueUpdates();
    }

    return id;
  }
  /**
   * Unregister a listener. The `id` param shall match the identifier
   * previously returned by `addListener()`.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#removelistener
   */
  ;

  _proto.removeListener = function removeListener(id) {
    delete this._listeners[id];

    if (this.__isNative && !this.hasListeners()) {
      this._stopListeningForNativeValueUpdates();
    }
  }
  /**
   * Remove all registered listeners.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#removealllisteners
   */
  ;

  _proto.removeAllListeners = function removeAllListeners() {
    this._listeners = {};

    if (this.__isNative) {
      this._stopListeningForNativeValueUpdates();
    }
  };

  _proto.hasListeners = function hasListeners() {
    return !!Object.keys(this._listeners).length;
  };

  _proto._startListeningToNativeValueUpdates = function _startListeningToNativeValueUpdates() {
    var _this = this;

    if (this.__nativeAnimatedValueListener && !this.__shouldUpdateListenersForNewNativeTag) {
      return;
    }

    if (this.__shouldUpdateListenersForNewNativeTag) {
      this.__shouldUpdateListenersForNewNativeTag = false;

      this._stopListeningForNativeValueUpdates();
    }

    NativeAnimatedAPI.startListeningToAnimatedNodeValue(this.__getNativeTag());
    this.__nativeAnimatedValueListener = _NativeAnimatedHelper.default.nativeEventEmitter.addListener('onAnimatedValueUpdate', function (data) {
      if (data.tag !== _this.__getNativeTag()) {
        return;
      }

      _this._onAnimatedValueUpdateReceived(data.value);
    });
  };

  _proto._onAnimatedValueUpdateReceived = function _onAnimatedValueUpdateReceived(value) {
    this.__callListeners(value);
  };

  _proto.__callListeners = function __callListeners(value) {
    for (var _key in this._listeners) {
      this._listeners[_key]({
        value: value
      });
    }
  };

  _proto._stopListeningForNativeValueUpdates = function _stopListeningForNativeValueUpdates() {
    if (!this.__nativeAnimatedValueListener) {
      return;
    }

    this.__nativeAnimatedValueListener.remove();

    this.__nativeAnimatedValueListener = null;
    NativeAnimatedAPI.stopListeningToAnimatedNodeValue(this.__getNativeTag());
  };

  _proto.__getNativeTag = function __getNativeTag() {
    var _this$__nativeTag;

    _NativeAnimatedHelper.default.assertNativeAnimatedModule();

    (0, _invariant.default)(this.__isNative, 'Attempt to get native tag from node not marked as "native"');
    var nativeTag = (_this$__nativeTag = this.__nativeTag) !== null && _this$__nativeTag !== void 0 ? _this$__nativeTag : _NativeAnimatedHelper.default.generateNewNodeTag();

    if (this.__nativeTag == null) {
      this.__nativeTag = nativeTag;

      _NativeAnimatedHelper.default.API.createAnimatedNode(nativeTag, this.__getNativeConfig());

      this.__shouldUpdateListenersForNewNativeTag = true;
    }

    return nativeTag;
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    throw new Error('This JS animated node type cannot be used as native animated node');
  };

  _proto.toJSON = function toJSON() {
    return this.__getValue();
  };

  return AnimatedNode;
}();

var _default = AnimatedNode;
exports.default = _default;
module.exports = exports.default;