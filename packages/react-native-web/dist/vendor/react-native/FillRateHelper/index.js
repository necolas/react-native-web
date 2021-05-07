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

var Info = function Info() {
  this.any_blank_count = 0;
  this.any_blank_ms = 0;
  this.any_blank_speed_sum = 0;
  this.mostly_blank_count = 0;
  this.mostly_blank_ms = 0;
  this.pixels_blank = 0;
  this.pixels_sampled = 0;
  this.pixels_scrolled = 0;
  this.total_time_spent = 0;
  this.sample_count = 0;
};

var DEBUG = false;
var _listeners = [];
var _minSampleCount = 10;

var _sampleRate = DEBUG ? 1 : null;
/**
 * A helper class for detecting when the maximem fill rate of `VirtualizedList` is exceeded.
 * By default the sampling rate is set to zero and this will do nothing. If you want to collect
 * samples (e.g. to log them), make sure to call `FillRateHelper.setSampleRate(0.0-1.0)`.
 *
 * Listeners and sample rate are global for all `VirtualizedList`s - typical usage will combine with
 * `SceneTracker.getActiveScene` to determine the context of the events.
 */


var FillRateHelper = /*#__PURE__*/function () {
  FillRateHelper.addListener = function addListener(callback) {
    if (_sampleRate === null) {
      console.warn('Call `FillRateHelper.setSampleRate` before `addListener`.');
    }

    _listeners.push(callback);

    return {
      remove: function remove() {
        _listeners = _listeners.filter(function (listener) {
          return callback !== listener;
        });
      }
    };
  };

  FillRateHelper.setSampleRate = function setSampleRate(sampleRate) {
    _sampleRate = sampleRate;
  };

  FillRateHelper.setMinSampleCount = function setMinSampleCount(minSampleCount) {
    _minSampleCount = minSampleCount;
  };

  function FillRateHelper(getFrameMetrics) {
    this._anyBlankStartTime = null;
    this._enabled = false;
    this._info = new Info();
    this._mostlyBlankStartTime = null;
    this._samplesStartTime = null;
    this._getFrameMetrics = getFrameMetrics;
    this._enabled = (_sampleRate || 0) > Math.random();

    this._resetData();
  }

  var _proto = FillRateHelper.prototype;

  _proto.activate = function activate() {
    if (this._enabled && this._samplesStartTime == null) {
      DEBUG && console.debug('FillRateHelper: activate');
      this._samplesStartTime = global.performance.now();
    }
  };

  _proto.deactivateAndFlush = function deactivateAndFlush() {
    if (!this._enabled) {
      return;
    }

    var start = this._samplesStartTime; // const for flow

    if (start == null) {
      DEBUG && console.debug('FillRateHelper: bail on deactivate with no start time');
      return;
    }

    if (this._info.sample_count < _minSampleCount) {
      // Don't bother with under-sampled events.
      this._resetData();

      return;
    }

    var total_time_spent = global.performance.now() - start;

    var info = _objectSpread(_objectSpread({}, this._info), {}, {
      total_time_spent: total_time_spent
    });

    if (DEBUG) {
      var derived = {
        avg_blankness: this._info.pixels_blank / this._info.pixels_sampled,
        avg_speed: this._info.pixels_scrolled / (total_time_spent / 1000),
        avg_speed_when_any_blank: this._info.any_blank_speed_sum / this._info.any_blank_count,
        any_blank_per_min: this._info.any_blank_count / (total_time_spent / 1000 / 60),
        any_blank_time_frac: this._info.any_blank_ms / total_time_spent,
        mostly_blank_per_min: this._info.mostly_blank_count / (total_time_spent / 1000 / 60),
        mostly_blank_time_frac: this._info.mostly_blank_ms / total_time_spent
      };

      for (var key in derived) {
        derived[key] = Math.round(1000 * derived[key]) / 1000;
      }

      console.debug('FillRateHelper deactivateAndFlush: ', {
        derived: derived,
        info: info
      });
    }

    _listeners.forEach(function (listener) {
      return listener(info);
    });

    this._resetData();
  };

  _proto.computeBlankness = function computeBlankness(props, state, scrollMetrics) {
    if (!this._enabled || props.getItemCount(props.data) === 0 || this._samplesStartTime == null) {
      return 0;
    }

    var dOffset = scrollMetrics.dOffset,
        offset = scrollMetrics.offset,
        velocity = scrollMetrics.velocity,
        visibleLength = scrollMetrics.visibleLength; // Denominator metrics that we track for all events - most of the time there is no blankness and
    // we want to capture that.

    this._info.sample_count++;
    this._info.pixels_sampled += Math.round(visibleLength);
    this._info.pixels_scrolled += Math.round(Math.abs(dOffset));
    var scrollSpeed = Math.round(Math.abs(velocity) * 1000); // px / sec
    // Whether blank now or not, record the elapsed time blank if we were blank last time.

    var now = global.performance.now();

    if (this._anyBlankStartTime != null) {
      this._info.any_blank_ms += now - this._anyBlankStartTime;
    }

    this._anyBlankStartTime = null;

    if (this._mostlyBlankStartTime != null) {
      this._info.mostly_blank_ms += now - this._mostlyBlankStartTime;
    }

    this._mostlyBlankStartTime = null;
    var blankTop = 0;
    var first = state.first;

    var firstFrame = this._getFrameMetrics(first);

    while (first <= state.last && (!firstFrame || !firstFrame.inLayout)) {
      firstFrame = this._getFrameMetrics(first);
      first++;
    } // Only count blankTop if we aren't rendering the first item, otherwise we will count the header
    // as blank.


    if (firstFrame && first > 0) {
      blankTop = Math.min(visibleLength, Math.max(0, firstFrame.offset - offset));
    }

    var blankBottom = 0;
    var last = state.last;

    var lastFrame = this._getFrameMetrics(last);

    while (last >= state.first && (!lastFrame || !lastFrame.inLayout)) {
      lastFrame = this._getFrameMetrics(last);
      last--;
    } // Only count blankBottom if we aren't rendering the last item, otherwise we will count the
    // footer as blank.


    if (lastFrame && last < props.getItemCount(props.data) - 1) {
      var bottomEdge = lastFrame.offset + lastFrame.length;
      blankBottom = Math.min(visibleLength, Math.max(0, offset + visibleLength - bottomEdge));
    }

    var pixels_blank = Math.round(blankTop + blankBottom);
    var blankness = pixels_blank / visibleLength;

    if (blankness > 0) {
      this._anyBlankStartTime = now;
      this._info.any_blank_speed_sum += scrollSpeed;
      this._info.any_blank_count++;
      this._info.pixels_blank += pixels_blank;

      if (blankness > 0.5) {
        this._mostlyBlankStartTime = now;
        this._info.mostly_blank_count++;
      }
    } else if (scrollSpeed < 0.01 || Math.abs(dOffset) < 1) {
      this.deactivateAndFlush();
    }

    return blankness;
  };

  _proto.enabled = function enabled() {
    return this._enabled;
  };

  _proto._resetData = function _resetData() {
    this._anyBlankStartTime = null;
    this._info = new Info();
    this._mostlyBlankStartTime = null;
    this._samplesStartTime = null;
  };

  return FillRateHelper;
}();

export default FillRateHelper;