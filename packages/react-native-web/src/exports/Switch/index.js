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

import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';
import StyleSheet from '../StyleSheet';
import UIManager from '../UIManager';
import View from '../View';
import React from 'react';

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

class Switch extends React.Component<SwitchProps> {
  _checkboxElement: HTMLInputElement;
  _thumbElement: View;

  static displayName = 'Switch';

  blur() {
    UIManager.blur(this._checkboxElement);
  }

  focus() {
    UIManager.focus(this._checkboxElement);
  }

  render() {
    const {
      accessibilityLabel,
      activeThumbColor = '#009688',
      activeTrackColor = '#A3D3CF',
      disabled = false,
      onValueChange, // eslint-disable-line
      style = emptyObject,
      thumbColor = '#FAFAFA',
      trackColor = '#939393',
      value = false,
      ...other
    } = this.props;

    const { height: styleHeight, width: styleWidth } = StyleSheet.flatten(style);
    const height = styleHeight || 20;
    const minWidth = multiplyStyleLengthValue(height, 2);
    const width = styleWidth > minWidth ? styleWidth : minWidth;
    const trackBorderRadius = multiplyStyleLengthValue(height, 0.5);
    const trackCurrentColor = value
      ? (trackColor != null && typeof trackColor === 'object' && trackColor.true) ||
        activeTrackColor
      : (trackColor != null && typeof trackColor === 'object' && trackColor.false) || trackColor;
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
      onBlur: this._handleFocusState,
      onChange: this._handleChange,
      onFocus: this._handleFocusState,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });

    return (
      <View {...other} style={rootStyle}>
        <View style={trackStyle} />
        <View ref={this._setThumbRef} style={thumbStyle} />
        {nativeControl}
      </View>
    );
  }

  _handleChange = (event: Object) => {
    const { onValueChange } = this.props;
    onValueChange && onValueChange(event.nativeEvent.target.checked);
  };

  _handleFocusState = (event: Object) => {
    const isFocused = event.nativeEvent.type === 'focus';
    const boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;
    if (this._thumbElement) {
      this._thumbElement.setNativeProps({ style: { boxShadow } });
    }
  };

  _setCheckboxRef = element => {
    this._checkboxElement = element;
  };

  _setThumbRef = element => {
    this._thumbElement = element;
  };
}

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

export default applyNativeMethods(Switch);
