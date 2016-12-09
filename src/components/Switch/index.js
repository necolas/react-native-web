import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import createDOMElement from '../../modules/createDOMElement';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';
import StyleSheet from '../../apis/StyleSheet';
import UIManager from '../../apis/UIManager';
import View from '../View';
import React, { Component, PropTypes } from 'react';

const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
const thumbFocusedBoxShadow = `${thumbDefaultBoxShadow}, 0 0 0 10px rgba(0,0,0,0.1)`;

class Switch extends Component {
  static displayName = 'Switch';

  static propTypes = {
    ...View.propTypes,
    activeThumbColor: ColorPropType,
    activeTrackColor: ColorPropType,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func,
    thumbColor: ColorPropType,
    trackColor: ColorPropType,
    value: PropTypes.bool
  };

  static defaultProps = {
    activeThumbColor: '#009688',
    activeTrackColor: '#A3D3CF',
    disabled: false,
    style: {},
    thumbColor: '#FAFAFA',
    trackColor: '#939393',
    value: false
  };

  blur() {
    UIManager.blur(this._checkbox);
  }

  focus() {
    UIManager.focus(this._checkbox);
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
      // remove any iOS-only props
      onTintColor, // eslint-disable-line
      thumbTintColor, // eslint-disable-line
      tintColor, // eslint-disable-line
      ...other
    } = this.props;

    const { height: styleHeight, width: styleWidth } = StyleSheet.flatten(style);
    const height = styleHeight || 20;
    const minWidth = multiplyStyleLengthValue(height, 2);
    const width = styleWidth > minWidth ? styleWidth : minWidth;
    const trackBorderRadius = multiplyStyleLengthValue(height, 0.5);
    const trackCurrentColor = value ? activeTrackColor : trackColor;
    const thumbCurrentColor = value ? activeThumbColor : thumbColor;
    const thumbHeight = height;
    const thumbWidth = thumbHeight;

    const rootStyle = [
      styles.root,
      style,
      { height, width },
      disabled && styles.cursorDefault
    ];

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
        transform: [ { translateX: value ? '100%' : '0%' } ],
        width: thumbWidth
      },
      disabled && styles.disabledThumb
    ];

    const nativeControl = createDOMElement('input', {
      checked: value,
      disabled: disabled,
      onBlur: this._handleFocusState,
      onChange: this._handleChange,
      onFocus: this._handleFocusState,
      ref: this._setCheckboxRef,
      style: [ styles.nativeControl, styles.cursorInherit ],
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
  }

  _handleFocusState = (event: Object) => {
    const isFocused = event.nativeEvent.type === 'focus';
    const boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;
    this._thumb.setNativeProps({ style: { boxShadow } });
  }

  _setCheckboxRef = (component) => {
    this._checkbox = component;
  }

  _setThumbRef = (component) => {
    this._thumb = component;
  }
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
    transition: '0.1s',
    width: '90%'
  },
  disabledTrack: {
    backgroundColor: '#D5D5D5'
  },
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    transition: '0.1s'
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

module.exports = applyNativeMethods(Switch);
