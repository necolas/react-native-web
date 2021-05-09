/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedWithChildren from './AnimatedWithChildren';
import InteractionManager from '../../../../exports/InteractionManager';
import NativeAnimatedHelper from '../NativeAnimatedHelper';

import type Animation, {EndCallback} from '../animations/Animation';
import type {InterpolationConfigType} from './AnimatedInterpolation';
import type AnimatedTracking from './AnimatedTracking';

const NativeAnimatedAPI = NativeAnimatedHelper.API;

/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */
function _flush(rootNode: AnimatedValue): void {
  const animatedStyles = new Set();
  function findAnimatedStyles(node) {
    /* $FlowFixMe(>=0.68.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.68 was deployed. To see the error delete this
     * comment and run Flow. */
    if (typeof node.update === 'function') {
      animatedStyles.add(node);
    } else {
      node.__getChildren().forEach(findAnimatedStyles);
    }
  }
  findAnimatedStyles(rootNode);
  /* $FlowFixMe */
  animatedStyles.forEach(animatedStyle => animatedStyle.update());
}

/**
 * Standard value for driving animations.  One `Animated.Value` can drive
 * multiple properties in a synchronized fashion, but can only be driven by one
 * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
 * or calling `setValue`) will stop any previous ones.
 *
 * See https://reactnative.dev/docs/animatedvalue.html
 */
class AnimatedValue extends AnimatedWithChildren {
  _value: number;
  _startingValue: number;
  _offset: number;
  _animation: ?Animation;
  _tracking: ?AnimatedTracking;

  constructor(value: number) {
    super();
    if (typeof value !== 'number') {
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    }
    this._startingValue = this._value = value;
    this._offset = 0;
    this._animation = null;
  }

  __detach() {
    if (this.__isNative) {
      NativeAnimatedAPI.getValue(this.__getNativeTag(), value => {
        this._value = value;
      });
    }
    this.stopAnimation();
    super.__detach();
  }

  __getValue(): number {
    return this._value + this._offset;
  }

  /**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#setvalue
   */
  setValue(value: number): void {
    if (this._animation) {
      this._animation.stop();
      this._animation = null;
    }
    this._updateValue(
      value,
      !this.__isNative /* don't perform a flush for natively driven values */,
    );
    if (this.__isNative) {
      NativeAnimatedAPI.setAnimatedNodeValue(this.__getNativeTag(), value);
    }
  }

  /**
   * Sets an offset that is applied on top of whatever value is set, whether via
   * `setValue`, an animation, or `Animated.event`.  Useful for compensating
   * things like the start of a pan gesture.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#setoffset
   */
  setOffset(offset: number): void {
    this._offset = offset;
    if (this.__isNative) {
      NativeAnimatedAPI.setAnimatedNodeOffset(this.__getNativeTag(), offset);
    }
  }

  /**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#flattenoffset
   */
  flattenOffset(): void {
    this._value += this._offset;
    this._offset = 0;
    if (this.__isNative) {
      NativeAnimatedAPI.flattenAnimatedNodeOffset(this.__getNativeTag());
    }
  }

  /**
   * Sets the offset value to the base value, and resets the base value to zero.
   * The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#extractoffset
   */
  extractOffset(): void {
    this._offset += this._value;
    this._value = 0;
    if (this.__isNative) {
      NativeAnimatedAPI.extractAnimatedNodeOffset(this.__getNativeTag());
    }
  }

  /**
   * Stops any running animation or tracking. `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#stopanimation
   */
  stopAnimation(callback?: ?(value: number) => void): void {
    this.stopTracking();
    this._animation && this._animation.stop();
    this._animation = null;
    callback && callback(this.__getValue());
  }

  /**
   * Stops any animation and resets the value to its original.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#resetanimation
   */
  resetAnimation(callback?: ?(value: number) => void): void {
    this.stopAnimation(callback);
    this._value = this._startingValue;
  }

  _onAnimatedValueUpdateReceived(value: number): void {
    this._updateValue(value, false /*flush*/);
  }

  /**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */
  interpolate(config: InterpolationConfigType): AnimatedInterpolation {
    return new AnimatedInterpolation(this, config);
  }

  /**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#animate
   */
  animate(animation: Animation, callback: ?EndCallback): void {
    let handle = null;
    if (animation.__isInteraction) {
      handle = InteractionManager.createInteractionHandle();
    }
    const previousAnimation = this._animation;
    this._animation && this._animation.stop();
    this._animation = animation;
    animation.start(
      this._value,
      value => {
        // Natively driven animations will never call into that callback, therefore we can always
        // pass flush = true to allow the updated value to propagate to native with setNativeProps
        this._updateValue(value, true /* flush */);
      },
      result => {
        this._animation = null;
        if (handle !== null) {
          InteractionManager.clearInteractionHandle(handle);
        }
        callback && callback(result);
      },
      previousAnimation,
      this,
    );
  }

  /**
   * Typically only used internally.
   */
  stopTracking(): void {
    this._tracking && this._tracking.__detach();
    this._tracking = null;
  }

  /**
   * Typically only used internally.
   */
  track(tracking: AnimatedTracking): void {
    this.stopTracking();
    this._tracking = tracking;
  }

  _updateValue(value: number, flush: boolean): void {
    if (value === undefined) {
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    }

    this._value = value;
    if (flush) {
      _flush(this);
    }
    super.__callListeners(this.__getValue());
  }

  __getNativeConfig(): Object {
    return {
      type: 'value',
      value: this._value,
      offset: this._offset,
    };
  }
}

export default AnimatedValue;
