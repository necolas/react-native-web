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

import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import * as React from 'react';
import Touchable from '../Touchable';
import View from '../View';

type BlurEvent = Object;
type FocusEvent = Object;
type PressEvent = Object;
type LayoutEvent = Object;
type EdgeInsetsProp = Object;

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

const OVERRIDE_PROPS = [
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityIgnoresInvertColors',
  'accessibilityRole',
  'accessibilityState',
  'hitSlop',
  'nativeID',
  'onBlur',
  'onFocus',
  'onLayout',
  'testID'
];

export type Props = $ReadOnly<{|
  accessible?: ?boolean,
  accessibilityLabel?: ?string,
  accessibilityHint?: ?string,
  accessibilityIgnoresInvertColors?: ?boolean,
  accessibilityRole?: ?string,
  accessibilityState?: ?Object,
  children?: ?React.Node,
  delayLongPress?: ?number,
  delayPressIn?: ?number,
  delayPressOut?: ?number,
  disabled?: ?boolean,
  hitSlop?: ?EdgeInsetsProp,
  nativeID?: ?string,
  touchSoundDisabled?: ?boolean,
  onBlur?: ?(e: BlurEvent) => void,
  onFocus?: ?(e: FocusEvent) => void,
  onLayout?: ?(event: LayoutEvent) => mixed,
  onLongPress?: ?(event: PressEvent) => mixed,
  onPress?: ?(event: PressEvent) => mixed,
  onPressIn?: ?(event: PressEvent) => mixed,
  onPressOut?: ?(event: PressEvent) => mixed,
  pressRetentionOffset?: ?EdgeInsetsProp,
  rejectResponderTermination?: ?boolean,
  testID?: ?string
|}>;

/**
 * Do not use unless you have a very good reason. All elements that
 * respond to press should have a visual feedback when touched.
 *
 * TouchableWithoutFeedback supports only one child.
 * If you wish to have several child components, wrap them in a View.
 */
// eslint-disable-next-line react/prefer-es6-class
const TouchableWithoutFeedback = ((createReactClass({
  displayName: 'TouchableWithoutFeedback',
  mixins: [Touchable.Mixin],

  getInitialState: function() {
    return this.touchableGetInitialState();
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
  },

  UNSAFE_componentWillReceiveProps: function(nextProps: Object) {
    ensurePositiveDelayProps(nextProps);
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandlePress: function(e: PressEvent) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleActivePressIn: function(e: PressEvent) {
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: PressEvent) {
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandleLongPress: function(e: PressEvent) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function(): typeof PRESS_RETENTION_OFFSET {
    // $FlowFixMe Invalid prop usage
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
    // Note(avik): remove dynamic typecast once Flow has been upgraded
    // $FlowFixMe(>=0.41.0)
    // eslint-disable-next-line
    const child = React.Children.only(this.props.children);
    let children = child.props.children;
    if (Touchable.TOUCH_TARGET_DEBUG && child.type === View) {
      children = React.Children.toArray(children);
      children.push(Touchable.renderDebugView({ color: 'red', hitSlop: this.props.hitSlop }));
    }

    const overrides = {};
    for (const prop of OVERRIDE_PROPS) {
      if (this.props[prop] !== undefined) {
        overrides[prop] = this.props[prop];
      }
    }

    return (React: any).cloneElement(child, {
      ...overrides,
      accessible: this.props.accessible !== false,
      //clickable:
      //  this.props.clickable !== false && this.props.onPress !== undefined,
      //onClick: this.touchableHandlePress,
      onKeyDown: this.touchableHandleKeyEvent,
      onKeyUp: this.touchableHandleKeyEvent,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      children
    });
  }
}): any): React.ComponentType<Props>);

export default TouchableWithoutFeedback;
