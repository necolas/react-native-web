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

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * EventSubscriptionVendor stores a set of EventSubscriptions that are
 * subscribed to a particular event type.
 */
var EventSubscriptionVendor = /*#__PURE__*/function () {
  function EventSubscriptionVendor() {
    this._subscriptionsForType = {};
  }
  /**
   * Adds a subscription keyed by an event type.
   *
   * @param {string} eventType
   * @param {EventSubscription} subscription
   */


  var _proto = EventSubscriptionVendor.prototype;

  _proto.addSubscription = function addSubscription(eventType, subscription) {
    (0, _invariant.default)(subscription.subscriber === this, 'The subscriber of the subscription is incorrectly set.');

    if (!this._subscriptionsForType[eventType]) {
      this._subscriptionsForType[eventType] = [];
    }

    var key = this._subscriptionsForType[eventType].length;

    this._subscriptionsForType[eventType].push(subscription);

    subscription.eventType = eventType;
    subscription.key = key;
    return subscription;
  }
  /**
   * Removes a bulk set of the subscriptions.
   *
   * @param {?string} eventType - Optional name of the event type whose
   *   registered supscriptions to remove, if null remove all subscriptions.
   */
  ;

  _proto.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
    if (eventType == null) {
      this._subscriptionsForType = {};
    } else {
      delete this._subscriptionsForType[eventType];
    }
  }
  /**
   * Removes a specific subscription. Instead of calling this function, call
   * `subscription.remove()` directly.
   *
   * @param {object} subscription
   */
  ;

  _proto.removeSubscription = function removeSubscription(subscription) {
    var eventType = subscription.eventType;
    var key = subscription.key;
    var subscriptionsForType = this._subscriptionsForType[eventType];

    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  }
  /**
   * Returns the array of subscriptions that are currently registered for the
   * given event type.
   *
   * Note: This array can be potentially sparse as subscriptions are deleted
   * from it when they are removed.
   *
   * TODO: This returns a nullable array. wat?
   *
   * @param {string} eventType
   * @returns {?array}
   */
  ;

  _proto.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
    return this._subscriptionsForType[eventType];
  };

  return EventSubscriptionVendor;
}();

var _default = EventSubscriptionVendor;
exports.default = _default;
module.exports = exports.default;