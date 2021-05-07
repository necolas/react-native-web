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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import invariant from 'fbjs/lib/invariant';

/**
 * A Utility class for calculating viewable items based on current metrics like scroll position and
 * layout.
 *
 * An item is said to be in a "viewable" state when any of the following
 * is true for longer than `minimumViewTime` milliseconds (after an interaction if `waitForInteraction`
 * is true):
 *
 * - Occupying >= `viewAreaCoveragePercentThreshold` of the view area XOR fraction of the item
 *   visible in the view area >= `itemVisiblePercentThreshold`.
 * - Entirely visible on screen
 */
var ViewabilityHelper = /*#__PURE__*/function () {
  function ViewabilityHelper(config) {
    if (config === void 0) {
      config = {
        viewAreaCoveragePercentThreshold: 0
      };
    }

    this._hasInteracted = false;
    this._timers = new Set();
    this._viewableIndices = [];
    this._viewableItems = new Map();
    this._config = config;
  }
  /**
   * Cleanup, e.g. on unmount. Clears any pending timers.
   */


  var _proto = ViewabilityHelper.prototype;

  _proto.dispose = function dispose() {
    this._timers.forEach(clearTimeout);
  }
  /**
   * Determines which items are viewable based on the current metrics and config.
   */
  ;

  _proto.computeViewableItems = function computeViewableItems(itemCount, scrollOffset, viewportHeight, getFrameMetrics, renderRange) {
    var _this$_config = this._config,
        itemVisiblePercentThreshold = _this$_config.itemVisiblePercentThreshold,
        viewAreaCoveragePercentThreshold = _this$_config.viewAreaCoveragePercentThreshold;
    var viewAreaMode = viewAreaCoveragePercentThreshold != null;
    var viewablePercentThreshold = viewAreaMode ? viewAreaCoveragePercentThreshold : itemVisiblePercentThreshold;
    invariant(viewablePercentThreshold != null && itemVisiblePercentThreshold != null !== (viewAreaCoveragePercentThreshold != null), 'Must set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold');
    var viewableIndices = [];

    if (itemCount === 0) {
      return viewableIndices;
    }

    var firstVisible = -1;

    var _ref = renderRange || {
      first: 0,
      last: itemCount - 1
    },
        first = _ref.first,
        last = _ref.last;

    if (last >= itemCount) {
      console.warn('Invalid render range computing viewability ' + JSON.stringify({
        renderRange: renderRange,
        itemCount: itemCount
      }));
      return [];
    }

    for (var idx = first; idx <= last; idx++) {
      var metrics = getFrameMetrics(idx);

      if (!metrics) {
        continue;
      }

      var top = metrics.offset - scrollOffset;
      var bottom = top + metrics.length;

      if (top < viewportHeight && bottom > 0) {
        firstVisible = idx;

        if (_isViewable(viewAreaMode, viewablePercentThreshold, top, bottom, viewportHeight, metrics.length)) {
          viewableIndices.push(idx);
        }
      } else if (firstVisible >= 0) {
        break;
      }
    }

    return viewableIndices;
  }
  /**
   * Figures out which items are viewable and how that has changed from before and calls
   * `onViewableItemsChanged` as appropriate.
   */
  ;

  _proto.onUpdate = function onUpdate(itemCount, scrollOffset, viewportHeight, getFrameMetrics, createViewToken, onViewableItemsChanged, renderRange) {
    var _this = this;

    if (this._config.waitForInteraction && !this._hasInteracted || itemCount === 0 || !getFrameMetrics(0)) {
      return;
    }

    var viewableIndices = [];

    if (itemCount) {
      viewableIndices = this.computeViewableItems(itemCount, scrollOffset, viewportHeight, getFrameMetrics, renderRange);
    }

    if (this._viewableIndices.length === viewableIndices.length && this._viewableIndices.every(function (v, ii) {
      return v === viewableIndices[ii];
    })) {
      // We might get a lot of scroll events where visibility doesn't change and we don't want to do
      // extra work in those cases.
      return;
    }

    this._viewableIndices = viewableIndices;

    if (this._config.minimumViewTime) {
      var handle = setTimeout(function () {
        _this._timers.delete(handle);

        _this._onUpdateSync(viewableIndices, onViewableItemsChanged, createViewToken);
      }, this._config.minimumViewTime);

      this._timers.add(handle);
    } else {
      this._onUpdateSync(viewableIndices, onViewableItemsChanged, createViewToken);
    }
  }
  /**
   * clean-up cached _viewableIndices to evaluate changed items on next update
   */
  ;

  _proto.resetViewableIndices = function resetViewableIndices() {
    this._viewableIndices = [];
  }
  /**
   * Records that an interaction has happened even if there has been no scroll.
   */
  ;

  _proto.recordInteraction = function recordInteraction() {
    this._hasInteracted = true;
  };

  _proto._onUpdateSync = function _onUpdateSync( // $FlowFixMe
  viewableIndicesToCheck, // $FlowFixMe
  onViewableItemsChanged, // $FlowFixMe
  createViewToken) {
    var _this2 = this;

    // Filter out indices that have gone out of view since this call was scheduled.
    viewableIndicesToCheck = viewableIndicesToCheck.filter(function (ii) {
      return _this2._viewableIndices.includes(ii);
    });
    var prevItems = this._viewableItems;
    var nextItems = new Map(viewableIndicesToCheck.map(function (ii) {
      var viewable = createViewToken(ii, true);
      return [viewable.key, viewable];
    }));
    var changed = [];

    for (var _iterator = _createForOfIteratorHelperLoose(nextItems), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          key = _step$value[0],
          viewable = _step$value[1];

      if (!prevItems.has(key)) {
        changed.push(viewable);
      }
    }

    for (var _iterator2 = _createForOfIteratorHelperLoose(prevItems), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          _key = _step2$value[0],
          _viewable = _step2$value[1];

      if (!nextItems.has(_key)) {
        changed.push(_objectSpread(_objectSpread({}, _viewable), {}, {
          isViewable: false
        }));
      }
    }

    if (changed.length > 0) {
      this._viewableItems = nextItems;
      onViewableItemsChanged({
        viewableItems: Array.from(nextItems.values()),
        changed: changed,
        viewabilityConfig: this._config
      });
    }
  };

  return ViewabilityHelper;
}();

function _isViewable(viewAreaMode, viewablePercentThreshold, top, bottom, viewportHeight, itemLength) {
  if (_isEntirelyVisible(top, bottom, viewportHeight)) {
    return true;
  } else {
    var pixels = _getPixelsVisible(top, bottom, viewportHeight);

    var percent = 100 * (viewAreaMode ? pixels / viewportHeight : pixels / itemLength);
    return percent >= viewablePercentThreshold;
  }
}

function _getPixelsVisible(top, bottom, viewportHeight) {
  var visibleHeight = Math.min(bottom, viewportHeight) - Math.max(top, 0);
  return Math.max(0, visibleHeight);
}

function _isEntirelyVisible(top, bottom, viewportHeight) {
  return top >= 0 && bottom <= viewportHeight && bottom > top;
}

export default ViewabilityHelper;