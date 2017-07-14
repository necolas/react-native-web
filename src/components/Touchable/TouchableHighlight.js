/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule TouchableHighlight
 * @noflow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import createReactClass from 'create-react-class';
import ensureComponentIsNative from './ensureComponentIsNative';
import ensurePositiveDelayProps from './ensurePositiveDelayProps';
import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TimerMixin from 'react-timer-mixin';
import Touchable from './Touchable';
import TouchableWithoutFeedback from './TouchableWithoutFeedback';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import { func, number } from 'prop-types';

type Event = Object;

const DEFAULT_PROPS = {
  activeOpacity: 0.85,
  underlayColor: 'black'
};

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 */

/* eslint-disable react/prefer-es6-class */
const TouchableHighlight = createReactClass({
  displayName: 'TouchableHighlight',
  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: number,
    /**
     * Called immediately after the underlay is hidden
     */
    onHideUnderlay: func,
    /**
     * Called immediately after the underlay is shown
     */
    onShowUnderlay: func,
    style: ViewPropTypes.style,
    /**
     * The color of the underlay that will show through when the touch is
     * active.
     */
    underlayColor: ColorPropType
  },

  mixins: [TimerMixin, Touchable.Mixin],

  getDefaultProps: () => DEFAULT_PROPS,

  // Performance optimization to avoid constantly re-generating these objects.
  _computeSyntheticState: function(props) {
    return {
      activeProps: {
        style: {
          opacity: props.activeOpacity
        }
      },
      activeUnderlayProps: {
        style: {
          backgroundColor: props.underlayColor
        }
      },
      underlayStyle: [INACTIVE_UNDERLAY_PROPS.style, props.style]
    };
  },

  getInitialState: function() {
    this._isMounted = false;
    return {
      ...this.touchableGetInitialState(),
      ...this._computeSyntheticState(this.props)
    };
  },

  componentDidMount: function() {
    this._isMounted = true;
    ensurePositiveDelayProps(this.props);
    ensureComponentIsNative(this._childRef);
  },

  componentWillUnmount: function() {
    this._isMounted = false;
  },

  componentDidUpdate: function() {
    ensureComponentIsNative(this._childRef);
  },

  componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
    if (
      nextProps.activeOpacity !== this.props.activeOpacity ||
      nextProps.underlayColor !== this.props.underlayColor ||
      nextProps.style !== this.props.style
    ) {
      this.setState(this._computeSyntheticState(nextProps));
    }
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function(e: Event) {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    this._showUnderlay();
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    if (!this._hideTimeout) {
      this._hideUnderlay();
    }
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function(e: Event) {
    this.clearTimeout(this._hideTimeout);
    this._showUnderlay();
    this._hideTimeout = this.setTimeout(this._hideUnderlay, this.props.delayPressOut || 100);
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
    return this.props.delayPressIn;
  },

  touchableGetLongPressDelayMS: function() {
    return this.props.delayLongPress;
  },

  touchableGetPressOutDelayMS: function() {
    return this.props.delayPressOut;
  },

  _showUnderlay: function() {
    if (!this._isMounted || !this._hasPressHandler()) {
      return;
    }

    this._underlayRef.setNativeProps(this.state.activeUnderlayProps);
    this._childRef.setNativeProps(this.state.activeProps);
    this.props.onShowUnderlay && this.props.onShowUnderlay();
  },

  _hideUnderlay: function() {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    if (this._hasPressHandler() && this._underlayRef) {
      this._childRef.setNativeProps(INACTIVE_CHILD_PROPS);
      this._underlayRef.setNativeProps({
        ...INACTIVE_UNDERLAY_PROPS,
        style: this.state.underlayStyle
      });
      this.props.onHideUnderlay && this.props.onHideUnderlay();
    }
  },

  _hasPressHandler: function() {
    return !!(
      this.props.onPress ||
      this.props.onPressIn ||
      this.props.onPressOut ||
      this.props.onLongPress
    );
  },

  _setChildRef(node) {
    this._childRef = node;
  },

  _setUnderlayRef(node) {
    this._underlayRef = node;
  },

  render: function() {
    const {
      /* eslint-disable */
      activeOpacity,
      onHideUnderlay,
      onShowUnderlay,
      underlayColor,
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
        ref={this._setUnderlayRef}
        style={[styles.root, !this.props.disabled && styles.actionable, this.state.underlayStyle]}
      >
        {React.cloneElement(React.Children.only(this.props.children), {
          ref: this._setChildRef
        })}
        {Touchable.renderDebugView({ color: 'green', hitSlop: this.props.hitSlop })}
      </View>
    );
  }
});

const INACTIVE_CHILD_PROPS = {
  style: StyleSheet.create({ x: { opacity: 1.0 } }).x
};
const INACTIVE_UNDERLAY_PROPS = {
  style: StyleSheet.create({ x: { backgroundColor: 'transparent' } }).x
};

const styles = StyleSheet.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulate'
  }
});

export default applyNativeMethods(TouchableHighlight);
