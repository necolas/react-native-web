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

import Platform from '../../../exports/Platform';
import RCTDeviceEventEmitter from './RCTDeviceEventEmitter';
import invariant from 'fbjs/lib/invariant';

/**
 * `NativeEventEmitter` is intended for use by Native Modules to emit events to
 * JavaScript listeners. If a `NativeModule` is supplied to the constructor, it
 * will be notified (via `addListener` and `removeListeners`) when the listener
 * count changes to manage "native memory".
 *
 * Currently, all native events are fired via a global `RCTDeviceEventEmitter`.
 * This means event names must be globally unique, and it means that call sites
 * can theoretically listen to `RCTDeviceEventEmitter` (although discouraged).
 */
var NativeEventEmitter = /*#__PURE__*/function () {
  function NativeEventEmitter(nativeModule) {
    if (Platform.OS === 'ios') {
      invariant(nativeModule != null, '`new NativeEventEmitter()` requires a non-null argument.');
      this._nativeModule = nativeModule;
    }
  }

  var _proto = NativeEventEmitter.prototype;

  _proto.addListener = function addListener(eventType, listener, context) {
    var _this$_nativeModule,
        _this = this;

    (_this$_nativeModule = this._nativeModule) == null ? void 0 : _this$_nativeModule.addListener(eventType);
    var subscription = RCTDeviceEventEmitter.addListener(eventType, listener, context);
    return {
      remove: function remove() {
        if (subscription != null) {
          var _this$_nativeModule2;

          (_this$_nativeModule2 = _this._nativeModule) == null ? void 0 : _this$_nativeModule2.removeListeners(1); // $FlowFixMe[incompatible-use]

          subscription.remove();
          subscription = null;
        }
      }
    };
  }
  /**
   * @deprecated Use `remove` on the EventSubscription from `addListener`.
   */
  ;

  _proto.removeListener = function removeListener(eventType, listener) {
    var _this$_nativeModule3;

    (_this$_nativeModule3 = this._nativeModule) == null ? void 0 : _this$_nativeModule3.removeListeners(1); // NOTE: This will report a deprecation notice via `console.error`.
    // $FlowFixMe[prop-missing] - `removeListener` exists but is deprecated.

    RCTDeviceEventEmitter.removeListener(eventType, listener);
  };

  _proto.emit = function emit(eventType) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // Generally, `RCTDeviceEventEmitter` is directly invoked. But this is
    // included for completeness.
    RCTDeviceEventEmitter.emit.apply(RCTDeviceEventEmitter, [eventType].concat(args));
  };

  _proto.removeAllListeners = function removeAllListeners(eventType) {
    var _this$_nativeModule4;

    invariant(eventType != null, '`NativeEventEmitter.removeAllListener()` requires a non-null argument.');
    (_this$_nativeModule4 = this._nativeModule) == null ? void 0 : _this$_nativeModule4.removeListeners(this.listenerCount(eventType));
    RCTDeviceEventEmitter.removeAllListeners(eventType);
  };

  _proto.listenerCount = function listenerCount(eventType) {
    return RCTDeviceEventEmitter.listenerCount(eventType);
  };

  return NativeEventEmitter;
}();

export { NativeEventEmitter as default };