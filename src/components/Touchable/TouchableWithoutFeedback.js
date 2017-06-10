/* eslint-disable */

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableWithoutFeedback
 * @flow
 */

import createReactClass from 'create-react-class';
import EdgeInsetsPropType from '../../propTypes/EdgeInsetsPropType';
import ensurePositiveDelayProps from './ensurePositiveDelayProps';
import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TimerMixin from 'react-timer-mixin';
import Touchable from './Touchable';
import warning from 'fbjs/lib/warning';
import { bool, element, func, number, string } from 'prop-types';

type Event = Object;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * Do not use unless you have a very good reason. All the elements that
 * respond to press should have a visual feedback when touched. This is
 * one of the primary reasons a "web" app doesn't feel "native".
 *
 * > **NOTE**: TouchableWithoutFeedback supports only one child
 * >
 * > If you wish to have several child components, wrap them in a View.
 */
const TouchableWithoutFeedback = createReactClass({
  mixins: [TimerMixin, Touchable.Mixin],

  propTypes: {
    accessible: bool,
    accessibilityLabel: string,
    accessibilityRole: string,
    children: element,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: bool,
    /**
     * Called when the touch is released, but not if cancelled (e.g. by a scroll
     * that steals the responder lock).
     */
    onPress: func,
    onPressIn: func,
    onPressOut: func,
    /**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
    onLayout: func,

    onLongPress: func,

    /**
     * Delay in ms, from the start of the touch, before onPressIn is called.
     */
    delayPressIn: number,
    /**
     * Delay in ms, from the release of the touch, before onPressOut is called.
     */
    delayPressOut: number,
    /**
     * Delay in ms, from onPressIn, before onLongPress is called.
     */
    delayLongPress: number,
    /**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
    // $FlowFixMe
    pressRetentionOffset: EdgeInsetsPropType,
    /**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     * ** NOTE **
     * The touch area never extends past the parent view bounds and the Z-index
     * of sibling views always takes precedence if a touch hits two overlapping
     * views.
     */
    // $FlowFixMe
    hitSlop: EdgeInsetsPropType
  },

  getInitialState: function() {
    return this.touchableGetInitialState();
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function(nextProps: Object) {
    ensurePositiveDelayProps(nextProps);
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandlePress: function(e: Event) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleActivePressIn: function(e: Event) {
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandleLongPress: function(e: Event) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function(): typeof PRESS_RETENTION_OFFSET {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function(): ?Object {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function(): number {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function(): number {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function(): number {
    return this.props.delayPressOut || 0;
  },

  render: function(): React.Element<any> {
    const {
      /* eslint-disable */
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

    // Note(avik): remove dynamic typecast once Flow has been upgraded
    const child = React.Children.only(this.props.children);
    let children = child.props.children;
    warning(
      !child.type || child.type.displayName !== 'Text',
      'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See ' +
        ((child._owner && child._owner.getName && child._owner.getName()) || '<unknown>')
    );
    if (
      process.env.NODE_ENV !== 'production' &&
      Touchable.TOUCH_TARGET_DEBUG &&
      child.type &&
      child.type.displayName === 'View'
    ) {
      children = React.Children.toArray(children);
      children.push(Touchable.renderDebugView({ color: 'red', hitSlop: this.props.hitSlop }));
    }
    const style = Touchable.TOUCH_TARGET_DEBUG && child.type && child.type.displayName === 'Text'
      ? [styles.root, this.props.disabled && styles.disabled, child.props.style, { color: 'red' }]
      : [styles.root, this.props.disabled && styles.disabled, child.props.style];
    return (React: any).cloneElement(child, {
      ...other,
      accessible: this.props.accessible !== false,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      style,
      children
    });
  }
});

var styles = StyleSheet.create({
  root: {
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'default'
  }
});

export default TouchableWithoutFeedback;
