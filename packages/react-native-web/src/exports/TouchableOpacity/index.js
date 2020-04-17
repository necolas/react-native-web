/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import type { Props as TouchableWithoutFeedbackProps } from '../TouchableWithoutFeedback';
import type { ViewProps } from '../View';

import * as React from 'react';
import { useCallback, useMemo, useState, useRef } from 'react';
import usePressEvents from '../../modules/PressResponder/usePressEvents';
import setAndForwardRef from '../../modules/setAndForwardRef';
import StyleSheet from '../StyleSheet';
import View from '../View';

type ViewStyle = $PropertyType<ViewProps, 'style'>;

type Props = $ReadOnly<{|
  ...TouchableWithoutFeedbackProps,
  activeOpacity?: ?number,
  style?: ?ViewStyle
|}>;

function getStyleOpacityWithDefault(style): number {
  const flatStyle = StyleSheet.flatten(style);
  const opacityValue = flatStyle != null ? flatStyle.opacity : null;
  return typeof opacityValue === 'number' ? opacityValue : 1;
}

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 */
function TouchableOpacity(props: Props, forwardedRef): React.Node {
  const {
    accessible,
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
    ...rest
  } = props;

  const hostRef = useRef(null);
  const setRef = setAndForwardRef({
    getForwardedRef: () => forwardedRef,
    setLocalRef: hostNode => {
      hostRef.current = hostNode;
    }
  });

  const styleOpacity = getStyleOpacityWithDefault(style);
  const [duration, setDuration] = useState('0s');
  const [opacity, setOpacity] = useState(styleOpacity);

  const setOpacityTo = useCallback(
    (value: number, duration: number) => {
      setOpacity(value);
      setDuration(duration ? `${duration / 1000}s` : '0s');
    },
    [setOpacity, setDuration]
  );

  const opacityActive = useCallback(
    (duration: number) => {
      setOpacityTo(activeOpacity ?? 0.2, duration);
    },
    [activeOpacity, setOpacityTo]
  );

  const opacityInactive = useCallback(
    (duration: number) => {
      setOpacityTo(styleOpacity, duration);
    },
    [setOpacityTo, styleOpacity]
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
      onPressStart(event) {
        opacityActive(event.dispatchConfig.registrationName === 'onResponderGrant' ? 0 : 150);
        if (onPressIn != null) {
          onPressIn(event);
        }
      },
      onPressEnd(event) {
        opacityInactive(250);
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
      opacityActive,
      opacityInactive,
      rejectResponderTermination
    ]
  );

  const pressEventHandlers = usePressEvents(hostRef, pressConfig);

  return (
    <View
      {...rest}
      {...pressEventHandlers}
      accessibilityState={{
        disabled,
        ...props.accessibilityState
      }}
      accessible={accessible !== false}
      focusable={focusable !== false && onPress !== undefined}
      ref={setRef}
      style={[
        styles.root,
        !disabled && styles.actionable,
        style,
        {
          opacity,
          transitionDuration: duration
        }
      ]}
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

const MemoedTouchableOpacity = React.memo(React.forwardRef(TouchableOpacity));
MemoedTouchableOpacity.displayName = 'TouchableOpacity';

export default (MemoedTouchableOpacity: React.AbstractComponent<
  Props,
  React.ElementRef<typeof View>
>);
