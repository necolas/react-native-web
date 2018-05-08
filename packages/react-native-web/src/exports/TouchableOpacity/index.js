/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import { number } from 'prop-types';
import React from 'react';
import StyleSheet from '../StyleSheet';
import Touchable from '../Touchable';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';
import View from '../View';

const flattenStyle = StyleSheet.flatten;

type Event = Object;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in a View, which is
 * added to the view hiearchy. Be aware that this can affect layout.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */

/* eslint-disable react/prefer-es6-class */
const TouchableOpacity = createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [Touchable.Mixin],

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

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function(value: number, duration: ?number) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: duration ? `${duration / 1000}s` : '0s'
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
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },

  _opacityFocused: function() {
    this.setOpacityTo(this.props.focusedOpacity);
  },

  _getChildStyleOpacityWithDefault: function() {
    const childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity === undefined ? 1 : childStyle.opacity;
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
        onKeyDown={this.touchableHandleKeyEvent}
        onKeyUp={this.touchableHandleKeyEvent}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        style={[styles.root, !this.props.disabled && styles.actionable, this.props.style]}
      >
        {this.props.children}
        {Touchable.renderDebugView({ color: 'blue', hitSlop: this.props.hitSlop })}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

export default applyNativeMethods(TouchableOpacity);
