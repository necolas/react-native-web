/**
 * @providesModule Switch
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import createElement from '../../modules/createElement';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';
import StyleSheet from '../../apis/StyleSheet';
import UIManager from '../../apis/UIManager';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';

const emptyObject = {};
const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
const thumbFocusedBoxShadow = `${thumbDefaultBoxShadow}, 0 0 0 10px rgba(0,0,0,0.1)`;

class Switch extends PureComponent {
  _checkboxElement: HTMLInputElement;
  _thumbElement: View;

  static displayName = 'Switch';

  static propTypes = {
    ...ViewPropTypes,
    activeThumbColor: ColorPropType,
    activeTrackColor: ColorPropType,
    disabled: bool,
    onValueChange: func,
    thumbColor: ColorPropType,
    trackColor: ColorPropType,
    value: bool,

    /* eslint-disable react/sort-prop-types */
    // Equivalent of 'activeTrackColor'
    onTintColor: ColorPropType,
    // Equivalent of 'thumbColor'
    thumbTintColor: ColorPropType,
    // Equivalent of 'trackColor'
    tintColor: ColorPropType
  };

  static defaultProps = {
    activeThumbColor: '#009688',
    activeTrackColor: '#A3D3CF',
    disabled: false,
    style: emptyObject,
    thumbColor: '#FAFAFA',
    trackColor: '#939393',
    value: false
  };

  blur() {
    UIManager.blur(this._checkboxElement);
  }

  focus() {
    UIManager.focus(this._checkboxElement);
  }

  render() {
    const {
      activeThumbColor,
      activeTrackColor,
      disabled,
      onValueChange, // eslint-disable-line
      style,
      thumbColor,
      trackColor,
      value,

      // React Native compatibility
      onTintColor,
      thumbTintColor,
      tintColor,
      ...other
    } = this.props;

    const { height: styleHeight, width: styleWidth } = StyleSheet.flatten(style);
    const height = styleHeight || 20;
    const minWidth = multiplyStyleLengthValue(height, 2);
    const width = styleWidth > minWidth ? styleWidth : minWidth;
    const trackBorderRadius = multiplyStyleLengthValue(height, 0.5);
    const trackCurrentColor = value ? onTintColor || activeTrackColor : tintColor || trackColor;
    const thumbCurrentColor = value ? activeThumbColor : thumbTintColor || thumbColor;
    const thumbHeight = height;
    const thumbWidth = thumbHeight;

    const rootStyle = [styles.root, style, { height, width }, disabled && styles.cursorDefault];

    const trackStyle = [
      styles.track,
      {
        backgroundColor: trackCurrentColor,
        borderRadius: trackBorderRadius
      },
      disabled && styles.disabledTrack
    ];

    const thumbStyle = [
      styles.thumb,
      {
        backgroundColor: thumbCurrentColor,
        height: thumbHeight,
        width: thumbWidth
      },
      disabled && styles.disabledThumb
    ];

    const nativeControl = createElement('input', {
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
        <View
          ref={this._setThumbRef}
          style={[
            thumbStyle,
            value && styles.thumbOn,
            {
              marginLeft: value ? multiplyStyleLengthValue(thumbWidth, -1) : 0
            }
          ]}
        />
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
  disabledTrack: {
    backgroundColor: '#D5D5D5'
  },
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    left: '0%',
    transform: [{ translateZ: 0 }],
    transitionDuration: '0.1s'
  },
  thumbOn: {
    left: '100%'
  },
  disabledThumb: {
    backgroundColor: '#BDBDBD'
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
