/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableBounce
 * @flow
 */
'use strict';

var Animated = require('../../apis/Animated');
var EdgeInsetsPropType = require('../../apis/StyleSheet/EdgeInsetsPropType');
var NativeMethodsMixin = require('../../modules/NativeMethodsMixin');
var React = require('react');
var StyleSheet = require('../../apis/StyleSheet');
var Touchable = require('./Touchable');

type Event = Object;

type State = {
  animationID: ?number;
  scale: Animated.Value;
};

var PRESS_RETENTION_OFFSET = {top: 20, left: 20, right: 20, bottom: 30};

/**
 * Example of using the `TouchableMixin` to play well with other responder
 * locking views including `ScrollView`. `TouchableMixin` provides touchable
 * hooks (`this.touchableHandle*`) that we forward events to. In turn,
 * `TouchableMixin` expects us to implement some abstract methods to handle
 * interesting interactions such as `handleTouchablePress`.
 */
var TouchableBounce = React.createClass({
  mixins: [Touchable.Mixin, NativeMethodsMixin],

  propTypes: {
    onPress: React.PropTypes.func,
    onPressIn: React.PropTypes.func,
    onPressOut: React.PropTypes.func,
    // The function passed takes a callback to start the animation which should
    // be run after this onPress handler is done. You can use this (for example)
    // to update UI before starting the animation.
    onPressWithCompletion: React.PropTypes.func,
    // the function passed is called after the animation is complete
    onPressAnimationComplete: React.PropTypes.func,
    /**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
    pressRetentionOffset: EdgeInsetsPropType,
    /**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     * ** NOTE **
     * The touch area never extends past the parent view bounds and the Z-index
     * of sibling views always takes precedence if a touch hits two overlapping
     * views.
     */
    hitSlop: EdgeInsetsPropType,
  },

  getInitialState: function(): State {
    return {
      ...this.touchableGetInitialState(),
      scale: new Animated.Value(1),
    };
  },

  bounceTo: function(
    value: number,
    velocity: number,
    bounciness: number,
    callback?: ?Function
  ) {
    Animated.spring(this.state.scale, {
      toValue: value,
      velocity,
      bounciness,
    }).start(callback);
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function(e: Event) {
    this.bounceTo(0.93, 0.1, 0);
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    this.bounceTo(1, 0.4, 0);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function(e: Event) {
    var onPressWithCompletion = this.props.onPressWithCompletion;
    if (onPressWithCompletion) {
      onPressWithCompletion(() => {
        this.state.scale.setValue(0.93);
        this.bounceTo(1, 10, 10, this.props.onPressAnimationComplete);
      });
      return;
    }

    this.bounceTo(1, 10, 10, this.props.onPressAnimationComplete);
    this.props.onPress && this.props.onPress(e);
  },

  touchableGetPressRectOffset: function(): typeof PRESS_RETENTION_OFFSET {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function(): ?Object {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function(): number {
    return 0;
  },

  render: function(): ReactElement {
    const scaleTransform = [{ scale: this.state.scale }];
    const propsTransform = this.props.style.transform;
    const transform = propsTransform && Array.isArray(propsTransform) ? propsTransform.concat(scaleTransform) : scaleTransform;

    return (
      <Animated.View
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole={this.props.accessibilityRole || 'button'}
        testID={this.props.testID}
        hitSlop={this.props.hitSlop}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        style={[styles.root, this.props.style, { transform }]}
        tabIndex='0'
      >
        {this.props.children}
      </Animated.View>
    );
  }
});

const styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  }
});

module.exports = TouchableBounce;
