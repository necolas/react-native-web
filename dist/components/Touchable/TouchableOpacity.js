/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableOpacity
 * @noflow
 */
'use strict';

// Note (avik): add  when Flow supports spread properties in propTypes

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Animated = require('../../apis/Animated');
var NativeMethodsMixin = require('../../modules/NativeMethodsMixin');
var React = require('react');
var StyleSheet = require('../../apis/StyleSheet');
var TimerMixin = require('react-timer-mixin');
var Touchable = require('./Touchable');
var TouchableWithoutFeedback = require('./TouchableWithoutFeedback');

var ensurePositiveDelayProps = require('./ensurePositiveDelayProps');
var flattenStyle = require('../../apis/StyleSheet/flattenStyle');

var PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 * This is done without actually changing the view hierarchy, and in general is
 * easy to add to an app without weird side-effects.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('image!myButton')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */
var TouchableOpacity = React.createClass({
  displayName: 'TouchableOpacity',

  mixins: [TimerMixin, Touchable.Mixin, NativeMethodsMixin],

  propTypes: _extends({}, TouchableWithoutFeedback.propTypes, {
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: React.PropTypes.number
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      activeOpacity: 0.2
    };
  },

  getInitialState: function getInitialState() {
    return _extends({}, this.touchableGetInitialState(), {
      anim: new Animated.Value(1)
    });
  },

  componentDidMount: function componentDidMount() {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  setOpacityTo: function setOpacityTo(value) {
    Animated.timing(this.state.anim, { toValue: value, duration: 150 }).start();
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    this._opacityActive();
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    if (!this._hideTimeout) {
      this._opacityInactive();
    }
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function touchableHandlePress(e) {
    this.clearTimeout(this._hideTimeout);
    this._opacityActive();
    this._hideTimeout = this.setTimeout(this._opacityInactive, this.props.delayPressOut || 100);
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function touchableGetHitSlop() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },

  _opacityActive: function _opacityActive() {
    this.setOpacityTo(this.props.activeOpacity);
  },

  _opacityInactive: function _opacityInactive() {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    var childStyle = flattenStyle(this.props.style) || {};
    this.setOpacityTo(childStyle.opacity === undefined ? 1 : childStyle.opacity);
  },

  _onKeyEnter: function _onKeyEnter(e, callback) {
    var ENTER = 13;
    if (e.keyCode === ENTER) {
      callback && callback(e);
    }
  },


  render: function render() {
    var _this = this;

    return React.createElement(
      Animated.View,
      {
        accessible: true,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityRole: this.props.accessibilityRole || 'button',
        style: [styles.root, this.props.style, { opacity: this.state.anim }],
        testID: this.props.testID,
        onLayout: this.props.onLayout,
        hitSlop: this.props.hitSlop,
        onKeyDown: function onKeyDown(e) {
          _this._onKeyEnter(e, _this.touchableHandleActivePressIn);
        },
        onKeyPress: function onKeyPress(e) {
          _this._onKeyEnter(e, _this.touchableHandlePress);
        },
        onKeyUp: function onKeyUp(e) {
          _this._onKeyEnter(e, _this.touchableHandleActivePressOut);
        },
        onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
        onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
        onResponderGrant: this.touchableHandleResponderGrant,
        onResponderMove: this.touchableHandleResponderMove,
        onResponderRelease: this.touchableHandleResponderRelease,
        onResponderTerminate: this.touchableHandleResponderTerminate,
        tabIndex: '0'
      },
      this.props.children
    );
  }
});

var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  }
});

module.exports = TouchableOpacity;