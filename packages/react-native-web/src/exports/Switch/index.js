/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import * as React from 'react';
import createElement from '../createElement';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';
import StyleSheet from '../StyleSheet';
import View from '../View';

type SwitchProps = {
  ...ViewProps,
  activeThumbColor?: ColorValue,
  activeTrackColor?: ColorValue,
  disabled?: boolean,
  onValueChange?: (e: any) => void,
  thumbColor?: ColorValue,
  trackColor?: ColorValue | {| false: ColorValue, true: ColorValue |},
  value?: boolean
};

const emptyObject = {};
const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
const thumbFocusedBoxShadow = `${thumbDefaultBoxShadow}, 0 0 0 10px rgba(0,0,0,0.1)`;

const Switch: React.AbstractComponent<
  SwitchProps,
  React.ElementRef<typeof View>
> = React.forwardRef((props, forwardedRef) => {
  const {
    accessibilityLabel,
    activeThumbColor = '#009688',
    activeTrackColor = '#A3D3CF',
    disabled = false,
    onValueChange,
    style = emptyObject,
    thumbColor = '#FAFAFA',
    trackColor = '#939393',
    value = false,
    ...other
  } = props;

  const thumbRef = React.useRef(null);

  function handleChange(event: Object) {
    if (onValueChange != null) {
      onValueChange(event.nativeEvent.target.checked);
    }
  }

  function handleFocusState(event: Object) {
    const isFocused = event.nativeEvent.type === 'focus';
    const boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;
    if (thumbRef.current != null) {
      thumbRef.current.style.boxShadow = boxShadow;
    }
  }

  const { height: styleHeight, width: styleWidth } = StyleSheet.flatten(style);
  const height = styleHeight || '20px';
  const minWidth = multiplyStyleLengthValue(height, 2);
  const width = styleWidth > minWidth ? styleWidth : minWidth;
  const trackBorderRadius = multiplyStyleLengthValue(height, 0.5);
  const trackCurrentColor = (function () {
    if (value === true) {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.true;
      } else {
        return activeTrackColor;
      }
    } else {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.false;
      } else {
        return trackColor;
      }
    }
  })();
  const thumbCurrentColor = value ? activeThumbColor : thumbColor;
  const thumbHeight = height;
  const thumbWidth = thumbHeight;

  const rootStyle = [styles.root, style, disabled && styles.cursorDefault, { height, width }];

  const trackStyle = [
    styles.track,
    {
      backgroundColor: disabled ? '#D5D5D5' : trackCurrentColor,
      borderRadius: trackBorderRadius
    }
  ];

  const thumbStyle = [
    styles.thumb,
    value && styles.thumbActive,
    {
      backgroundColor: disabled ? '#BDBDBD' : thumbCurrentColor,
      height: thumbHeight,
      marginStart: value ? multiplyStyleLengthValue(thumbWidth, -1) : 0,
      width: thumbWidth
    }
  ];

  const nativeControl = createElement('input', {
    accessibilityLabel,
    checked: value,
    disabled: disabled,
    onBlur: handleFocusState,
    onChange: handleChange,
    onFocus: handleFocusState,
    ref: forwardedRef,
    style: [styles.nativeControl, styles.cursorInherit],
    type: 'checkbox',
    role: 'switch'
  });

  return (
    <View {...other} style={rootStyle}>
      <View style={trackStyle} />
      <View ref={thumbRef} style={thumbStyle} />
      {nativeControl}
    </View>
  );
});

Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    height: '70%',
    margin: 'auto',
    transitionDuration: '0.1s',
    width: '100%'
  },
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    start: '0%',
    transform: [{ translateZ: 0 }],
    transitionDuration: '0.1s'
  },
  thumbActive: {
    start: '100%'
  },
  nativeControl: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  }
});

export default Switch;
