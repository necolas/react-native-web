/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';
var initialURL = canUseDOM ? window.location.href : '';

var Linking = /*#__PURE__*/function () {
  function Linking() {
    var _this = this;

    this._eventCallbacks = {};

    this.addEventListener = function (event, callback) {
      if (!_this._eventCallbacks[event]) {
        _this._eventCallbacks[event] = [callback];
        return;
      }

      _this._eventCallbacks[event].push(callback);
    };

    this.removeEventListener = function (event, callback) {
      var callbacks = _this._eventCallbacks[event];
      var filteredCallbacks = callbacks.filter(function (c) {
        return c.toString() !== callback.toString();
      });
      _this._eventCallbacks[event] = filteredCallbacks;
    };
  }

  var _proto = Linking.prototype;

  _proto._dispatchEvent = function _dispatchEvent(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var listeners = this._eventCallbacks[event];

    if (listeners != null && Array.isArray(listeners)) {
      listeners.map(function (listener) {
        listener.apply(void 0, data);
      });
    }
  }
  /**
   * Adds a event listener for the specified event. The callback will be called when the
   * said event is dispatched.
   */
  ;

  _proto.canOpenURL = function canOpenURL() {
    return Promise.resolve(true);
  };

  _proto.getInitialURL = function getInitialURL() {
    return Promise.resolve(initialURL);
  }
  /**
   * Try to open the given url in a secure fashion. The method returns a Promise object.
   * If the url opens, the promise is resolved. If not, the promise is rejected.
   * Dispatches the `onOpen` event if `url` is opened successfully
   */
  ;

  _proto.openURL = function openURL(url) {
    try {
      open(url);

      this._dispatchEvent('onOpen', url);

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto._validateURL = function _validateURL(url) {
    invariant(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    invariant(url, 'Invalid URL: cannot be empty');
  };

  return Linking;
}();

var open = function open(url) {
  if (canUseDOM) {
    var urlToOpen = new URL(url, window.location).toString();
    window.open(urlToOpen, '_blank', 'noopener');
  }
};

export default new Linking();