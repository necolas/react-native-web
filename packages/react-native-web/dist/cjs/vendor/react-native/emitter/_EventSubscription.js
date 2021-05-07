/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */
var _EventSubscription = /*#__PURE__*/function () {
  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */
  function _EventSubscription(subscriber) {
    this.subscriber = subscriber;
  }
  /**
   * Removes this subscription from the subscriber that controls it.
   */


  var _proto = _EventSubscription.prototype;

  _proto.remove = function remove() {
    this.subscriber.removeSubscription(this);
  };

  return _EventSubscription;
}();

var _default = _EventSubscription;
exports.default = _default;
module.exports = exports.default;