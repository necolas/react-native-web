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
  type ReactNode,
  memo,
  useCallback,
  useMemo,
  useState
} from 'react';

import usePressEvents from '../../modules/usePressEvents';
import type { PressEvent } from '../../modules/usePressEvents/PressResponder';
import type { Nullable } from '../../types';
import StyleSheet from '../StyleSheet';
import type { Props as TouchableWithoutFeedbackProps } from '../TouchableWithoutFeedback';
import View, { type ViewProps } from '../View';

type ViewStyle = ViewProps['style'];

type Props = Readonly<
  TouchableWithoutFeedbackProps & {
    activeOpacity?: Nullable<number>;
    style?: Nullable<ViewStyle>;
  }
>;

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 */
function TouchableOpacity(props: Props): ReactNode {
  const {
    activeOpacity,
    delayPressIn,
    delayPressOut,
    delayLongPress,
    disabled,
    focusable,
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    rejectResponderTermination,
    style,
    type,
    ...rest
  } = props;

  const [duration, setDuration] = useState('0s');
  const [opacityOverride, setOpacityOverride] =
    useState<Nullable<number>>(null);

  const setOpacityTo = useCallback(
    (value: Nullable<number>, duration: number) => {
      setOpacityOverride(value);
      setDuration(duration ? `${duration / 1000}s` : '0s');
    },
    [setOpacityOverride, setDuration]
  );

  const setOpacityActive = useCallback(
    (duration: number) => {
      setOpacityTo(activeOpacity ?? 0.2, duration);
    },
    [activeOpacity, setOpacityTo]
  );

  const setOpacityInactive = useCallback(
    (duration: number) => {
      setOpacityTo(null, duration);
    },
    [setOpacityTo]
  );

  const pressConfig = useMemo(
    () => ({
      cancelable: !rejectResponderTermination,
      disabled,
      delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress,
      onPress,
      onPressStart(event: PressEvent) {
        const isGrant =
          'dispatchConfig' in event
            ? event.dispatchConfig.registrationName === 'onResponderGrant'
            : event.type === 'keydown';
        setOpacityActive(isGrant ? 0 : 150);
        if (onPressIn != null) {
          onPressIn(event);
        }
      },
      onPressEnd(event: PressEvent) {
        setOpacityInactive(250);
        if (onPressOut != null) {
          onPressOut(event);
        }
      }
    }),
    [
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      rejectResponderTermination,
      setOpacityActive,
      setOpacityInactive
    ]
  );

  const pressEventHandlers = usePressEvents(pressConfig);

  return (
    <View
      {...rest}
      {...pressEventHandlers}
      aria-disabled={disabled ?? rest['aria-disabled']}
      disabled={disabled}
      focusable={!disabled && focusable !== false}
      pointerEvents={disabled ? 'box-none' : undefined}
      style={[
        styles.root,
        !disabled && styles.actionable,
        style,
        opacityOverride != null && { opacity: opacityOverride },
        { transitionDuration: duration }
      ]}
      unstable_type={type}
    />
  );
}

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

const MemoedTouchableOpacity: FunctionComponent<Props> = memo(TouchableOpacity);
MemoedTouchableOpacity.displayName = 'TouchableOpacity';

export default MemoedTouchableOpacity;
