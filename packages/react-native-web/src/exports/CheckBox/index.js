/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../ColorPropType';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import UIManager from '../UIManager';
import View from '../View';
import ViewPropTypes, { type ViewProps } from '../ViewPropTypes';
import React, { Component } from 'react';
import { bool, func } from 'prop-types';

type Props = ViewProps & {
  color?: ColorPropType,
  disabled?: boolean,
  onChange?: Function,
  onValueChange?: Function,
  value?: boolean
};

class CheckBox extends Component<Props> {
  _checkboxElement: HTMLInputElement;

  static displayName = 'CheckBox';

  static propTypes = {
    ...ViewPropTypes,
    color: ColorPropType,
    disabled: bool,
    onChange: func,
    onValueChange: func,
    value: bool
  };

  static defaultProps = {
    disabled: false,
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
      color,
      disabled,
      /* eslint-disable */
      onChange,
      onValueChange,
      /* eslint-enable */
      style,
      value,
      ...other
    } = this.props;

    const fakeControl = (
      <View
        style={[
          styles.fakeControl,
          value && styles.fakeControlChecked,
          // custom color
          value && color && { backgroundColor: color, borderColor: color },
          disabled && styles.fakeControlDisabled,
          value && disabled && styles.fakeControlCheckedAndDisabled
        ]}
      />
    );

    const nativeControl = createElement('input', {
      checked: value,
      disabled: disabled,
      onChange: this._handleChange,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });

    return (
      <View {...other} style={[styles.root, style, disabled && styles.cursorDefault]}>
        {fakeControl}
        {nativeControl}
      </View>
    );
  }

  _handleChange = (event: Object) => {
    const { onChange, onValueChange } = this.props;
    const value = event.nativeEvent.target.checked;
    event.nativeEvent.value = value;
    onChange && onChange(event);
    onValueChange && onValueChange(value);
  };

  _setCheckboxRef = element => {
    this._checkboxElement = element;
  };
}

const styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    height: 16,
    userSelect: 'none',
    width: 16
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  fakeControl: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#657786',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  fakeControlChecked: {
    backgroundColor: '#009688',
    backgroundImage:
      'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K")',
    backgroundRepeat: 'no-repeat',
    borderColor: '#009688'
  },
  fakeControlDisabled: {
    borderColor: '#CCD6DD'
  },
  fakeControlCheckedAndDisabled: {
    backgroundColor: '#AAB8C2',
    borderColor: '#AAB8C2'
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

export default applyNativeMethods(CheckBox);
