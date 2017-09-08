/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @providesModule KeyboardAvoidingView
 * @noflow
 */

import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import React from 'react';
import {number, oneOf} from 'prop-types';

type ViewLayout = {
  x: number,
  y: number,
  width: number,
  height: number,
};
type ViewLayoutEvent = {
  nativeEvent: {
    layout: ViewLayout,
  }
};
type ScreenRect = {
  screenX: number,
  screenY: number,
  width: number,
  height: number,
};
type KeyboardChangeEvent = {
  startCoordinates?: ScreenRect,
  endCoordinates: ScreenRect,
  duration?: number,
  easing?: string,
};

/* eslint-disable react/prefer-es6-class, react/prop-types */
class KeyboardAvoidingView {
  static propTypes = {
    ...ViewPropTypes,
    behavior: oneOf(['height', 'position', 'padding']),
    contentContainerStyle: StyleSheetPropType(ViewStylePropTypes),
    keyboardVerticalOffset: number.isRequired,
    style: StyleSheetPropType(ViewStylePropTypes)
  };

  static defaultProps = {
    keyboardVerticalOffset: 0,
  };

  frame: ?ViewLayout = null;

  relativeKeyboardHeight(keyboardFrame: ScreenRect): number {
    const frame = this.frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }
    const keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
    return Math.max(frame.y + frame.height - keyboardY, 0);
  }

  onKeyboardChange(event: ?KeyboardChangeEvent) {}

  onLayout(event: ViewLayoutEvent) {
    this.frame = event.nativeEvent.layout;
  }

  render() {
    const {
      /* eslint-disable */
      behavior,
      contentContainerStyle,
      keyboardVerticalOffset,
      /* eslint-enable */
      ...props
    } = this.props;

    return (
      <View onLayout={this.onLayout} {...props} />
    );
  }
}

export default KeyboardAvoidingView;
