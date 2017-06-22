/* eslint-disable */

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule TouchableOpacity
 * @noflow
 */

import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from './ensurePositiveDelayProps';
import NativeMethodsMixin from '../../modules/NativeMethodsMixin';
import { number } from 'prop-types';
import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TimerMixin from 'react-timer-mixin';
import Touchable from './Touchable';
import TouchableWithoutFeedback from './TouchableWithoutFeedback';
import View from '../View';

const flattenStyle = StyleSheet.flatten;

type Event = Object;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

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
 *         source={require('./myButton')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */
const TouchableOpacity = createReactClass({
  mixins: [TimerMixin, Touchable.Mixin, NativeMethodsMixin],

  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: number,
    focusedOpacity: number
  },

  getDefaultProps: function() {
    return {
      activeOpacity: 0.2,
      focusedOpacity: 0.7
    };
  },

  getInitialState: function() {
    return this.touchableGetInitialState();
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  setOpacityTo: function(value: number, duration: number) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: `${duration / 1000}s`
      }
    });
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function(e: Event) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function(e: Event) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function(e: Event) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function() {
    return this.props.delayPressOut;
  },

  _opacityActive: function(duration: number) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },

  _opacityInactive: function(duration: number) {
    const childStyle = flattenStyle(this.props.style) || {};
    this.setOpacityTo(childStyle.opacity === undefined ? 1 : childStyle.opacity, duration);
  },

  _opacityFocused: function() {
    this.setOpacityTo(this.props.focusedOpacity);
  },

  _onKeyEnter(e, callback) {
    const ENTER = 13;
    if ((e.type === 'keypress' ? e.charCode : e.keyCode) === ENTER) {
      callback && callback(e);
      e.stopPropagation();
    }
  },

  render: function() {
    const {
      /* eslint-disable */
      activeOpacity,
      focusedOpacity,
      delayLongPress,
      delayPressIn,
      delayPressOut,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      pressRetentionOffset,
      /* eslint-enable */
      ...other
    } = this.props;

    return (
      <View
        {...other}
        accessible={this.props.accessible !== false}
        style={[styles.root, this.props.disabled && styles.disabled, this.props.style]}
        onKeyDown={e => {
          this._onKeyEnter(e, this.touchableHandleActivePressIn);
        }}
        onKeyPress={e => {
          this._onKeyEnter(e, this.touchableHandlePress);
        }}
        onKeyUp={e => {
          this._onKeyEnter(e, this.touchableHandleActivePressOut);
        }}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
      >
        {this.props.children}
        {Touchable.renderDebugView({ color: 'blue', hitSlop: this.props.hitSlop })}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  disabled: {
    cursor: 'default'
  }
});

export default TouchableOpacity;
