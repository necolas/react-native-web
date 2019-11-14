/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import type { Props as TouchableWithoutFeedbackProps } from '../TouchableWithoutFeedback';

import applyNativeMethods from '../../modules/applyNativeMethods';
import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import Touchable from '../Touchable';
import View from '../View';

const flattenStyle = StyleSheet.flatten;

type Event = Object;
type PressEvent = Object;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

type Props = $ReadOnly<{|
  ...TouchableWithoutFeedbackProps,
  activeOpacity?: ?number,
  style?: ?any
|}>;

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in an Animated.View, which is
 * added to the view hiearchy.  Be aware that this can affect layout.
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
 * ### Example
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react'
 * import {
 *   AppRegistry,
 *   StyleSheet,
 *   TouchableOpacity,
 *   Text,
 *   View,
 * } from 'react-native'
 *
 * class App extends Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = { count: 0 }
 *   }
 *
 *   onPress = () => {
 *     this.setState({
 *       count: this.state.count+1
 *     })
 *   }
 *
 *  render() {
 *    return (
 *      <View style={styles.container}>
 *        <TouchableOpacity
 *          style={styles.button}
 *          onPress={this.onPress}
 *        >
 *          <Text> Touch Here </Text>
 *        </TouchableOpacity>
 *        <View style={[styles.countContainer]}>
 *          <Text style={[styles.countText]}>
 *             { this.state.count !== 0 ? this.state.count: null}
 *           </Text>
 *         </View>
 *       </View>
 *     )
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     paddingHorizontal: 10
 *   },
 *   button: {
 *     alignItems: 'center',
 *     backgroundColor: '#DDDDDD',
 *     padding: 10
 *   },
 *   countContainer: {
 *     alignItems: 'center',
 *     padding: 10
 *   },
 *   countText: {
 *     color: '#FF00FF'
 *   }
 * })
 *
 * AppRegistry.registerComponent('App', () => App)
 * ```
 *
 */

// eslint-disable-next-line react/prefer-es6-class
const TouchableOpacity = ((createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [Touchable.Mixin.withoutDefaultFocusAndBlur],

  getDefaultProps: function() {
    return {
      activeOpacity: 0.2
    };
  },

  getInitialState: function() {
    return {
      ...this.touchableGetInitialState(),
      anim: this._getChildStyleOpacityWithDefault()
    };
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
  },

  UNSAFE_componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function(value: number, duration: number) {
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
  touchableHandleActivePressIn: function(e: PressEvent) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: PressEvent) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandleFocus: function(e: Event) {
    //if (Platform.isTV) {
    //  this._opacityActive(150);
    //}
    this.props.onFocus && this.props.onFocus(e);
  },

  touchableHandleBlur: function(e: Event) {
    //if (Platform.isTV) {
    //  this._opacityInactive(250);
    //}
    this.props.onBlur && this.props.onBlur(e);
  },

  touchableHandlePress: function(e: PressEvent) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function(e: PressEvent) {
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

  _getChildStyleOpacityWithDefault: function() {
    const childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity == null ? 1 : childStyle.opacity;
  },

  render: function() {
    return (
      <View
        {...this.props}
        accessibilityHint={this.props.accessibilityHint}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole={this.props.accessibilityRole}
        accessibilityState={this.props.accessibilityState}
        accessible={this.props.accessible !== false}
        hitSlop={this.props.hitSlop}
        nativeID={this.props.nativeID}
        onKeyDown={this.touchableHandleKeyEvent}
        onKeyUp={this.touchableHandleKeyEvent}
        onLayout={this.props.onLayout}
        onResponderGrant={this.touchableHandleResponderGrant}
        //isTVSelectable={true}
        //nextFocusDown={this.props.nextFocusDown}
        //nextFocusForward={this.props.nextFocusForward}
        //nextFocusLeft={this.props.nextFocusLeft}
        //nextFocusRight={this.props.nextFocusRight}
        //nextFocusUp={this.props.nextFocusUp}
        //hasTVPreferredFocus={this.props.hasTVPreferredFocus}
        //tvParallaxProperties={this.props.tvParallaxProperties}
        onResponderMove={this.touchableHandleResponderMove}
        //clickable={
        //  this.props.clickable !== false && this.props.onPress !== undefined
        //}
        //onClick={this.touchableHandlePress}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        style={[
          styles.root,
          !this.props.disabled && styles.actionable,
          this.props.style,
          { opacity: this.state.anim }
        ]}
        testID={this.props.testID}
      >
        {this.props.children}
        {Touchable.renderDebugView({
          color: 'cyan',
          hitSlop: this.props.hitSlop
        })}
      </View>
    );
  }
}): any): React.ComponentType<Props>);

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
