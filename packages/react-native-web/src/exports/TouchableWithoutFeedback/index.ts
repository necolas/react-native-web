/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import {
  type FunctionComponent,
  type ReactElement,
  type ReactNode,
  type Ref,
  Children,
  cloneElement,
  memo,
  useMemo
} from 'react';

import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
import type { PressResponderConfig } from '../../modules/usePressEvents/PressResponder';
import type { PlatformMethods } from '../../types';
import type { ViewProps } from '../View';
import type { AccessibilityProps } from '../View/types';

export type Props = Readonly<
  AccessibilityProps & {
    children?: ReactNode;
    delayLongPress?: number;
    delayPressIn?: number;
    delayPressOut?: number;
    disabled?: boolean;
    focusable?: boolean;
    nativeID?: ViewProps['nativeID'];
    onBlur?: ViewProps['onBlur'];
    onFocus?: ViewProps['onFocus'];
    onLayout?: ViewProps['onLayout'];
    onLongPress?: PressResponderConfig['onLongPress'];
    onPress?: PressResponderConfig['onPress'];
    onPressIn?: PressResponderConfig['onPressStart'];
    onPressOut?: PressResponderConfig['onPressEnd'];
    ref?: Ref<HTMLElement & PlatformMethods>;
    rejectResponderTermination?: boolean;
    testID?: ViewProps['testID'];
    title?: ViewProps['title'];
    type?: ViewProps['unstable_type'];
  }
>;

const forwardPropsList = new Set([
  ...forwardedProps.accessibilityProps,
  'children',
  'disabled',
  'focusable',
  'nativeID',
  'onBlur',
  'onFocus',
  'onLayout',
  'testID',
  'title'
]);

function TouchableWithoutFeedback(props: Props): ReactNode {
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
    rejectResponderTermination,
    type
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

  const element = Children.only(props.children) as ReactElement<{
    'aria-disabled'?: AccessibilityProps['aria-disabled'];
    children?: ReactNode;
    ref?: Props['ref'];
    [key: string]: unknown;
  }>;

  const children = [element.props.children];
  const supportedProps = pick(props, forwardPropsList);

  supportedProps['aria-disabled'] =
    disabled ??
    props['aria-disabled'] ??
    props.accessibilityState?.disabled ??
    element.props['aria-disabled'];

  if (type != null) {
    supportedProps[
      typeof element.type === 'string' ? 'type' : 'unstable_type'
    ] = type;
  }

  supportedProps.focusable = !disabled && focusable !== false;
  supportedProps.ref = useMergeRefs(ref, element.props.ref);

  return cloneElement(
    element,
    { ...supportedProps, ...pressEventHandlers },
    ...children
  );
}

const MemoedTouchableWithoutFeedback: FunctionComponent<Props> = memo(
  TouchableWithoutFeedback
);
MemoedTouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';

export default MemoedTouchableWithoutFeedback;
