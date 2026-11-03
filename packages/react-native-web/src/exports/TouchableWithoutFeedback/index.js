/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use client';

import type { PressResponderConfig } from '../../modules/usePressEvents/PressResponder';
import type { ViewProps } from '../View';
import type { AccessibilityProps } from '../View/types';

import * as React from 'react';
import { useMemo } from 'react';
import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';

export type Props = Readonly<{|
  ...AccessibilityProps,
  children?: ?React.Node,
  delayLongPress?: ?number,
  delayPressIn?: ?number,
  delayPressOut?: ?number,
  disabled?: ?boolean,
  focusable?: ?boolean,
  nativeID?: ViewProps['nativeID'],
  onBlur?: ViewProps['onBlur'],
  onFocus?: ViewProps['onFocus'],
  onLayout?: ViewProps['onLayout'],
  onLongPress?: PressResponderConfig['onLongPress'],
  onPress?: PressResponderConfig['onPress'],
  onPressIn?: PressResponderConfig['onPressStart'],
  onPressOut?: PressResponderConfig['onPressEnd'],
  ref?: React.Ref<any>,
  rejectResponderTermination?: ?boolean,
  testID?: ViewProps['testID'],
  title?: ViewProps['title'],
  type?: ViewProps['type']
|}>;

const forwardPropsList = {
  ...forwardedProps.accessibilityProps,
  children: true,
  disabled: true,
  focusable: true,
  nativeID: true,
  onBlur: true,
  onFocus: true,
  onLayout: true,
  testID: true,
  title: true,
  type: true
};

function TouchableWithoutFeedback(props: Props): React.Node {
  const {
    delayPressIn,
    delayPressOut,
    delayLongPress,
    disabled,
    focusable,
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    ref,
    rejectResponderTermination
  } = props;

  const pressConfig = useMemo(
    () => ({
      cancelable: !rejectResponderTermination,
      disabled,
      delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress,
      onPress,
      onPressStart: onPressIn,
      onPressEnd: onPressOut
    }),
    [
      disabled,
      delayPressIn,
      delayPressOut,
      delayLongPress,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      rejectResponderTermination
    ]
  );

  const pressEventHandlers = usePressEvents(pressConfig);

  const element: any = React.Children.only(props.children);
  const children = [element.props.children];
  const supportedProps = pick(props, forwardPropsList);

  supportedProps['aria-disabled'] =
    disabled ??
    props['aria-disabled'] ??
    props.accessibilityState?.disabled ??
    element.props['aria-disabled'];

  supportedProps.focusable = !disabled && focusable !== false;
  supportedProps.ref = useMergeRefs(ref, element.props.ref);

  const elementProps = { ...supportedProps, ...pressEventHandlers };

  return React.cloneElement(element, elementProps, ...children);
}

const MemoedTouchableWithoutFeedback: component(...Props) = React.memo(
  TouchableWithoutFeedback
);
MemoedTouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';

export default MemoedTouchableWithoutFeedback;
