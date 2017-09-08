/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule KeyboardAvoidingView
 * @flow
 */

import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import { number, oneOf } from 'prop-types';
import React, { Component } from 'react';

import type { ViewLayout, ViewLayoutEvent } from '../View/ViewPropTypes';

class KeyboardAvoidingView extends Component {
  static propTypes = {
    ...ViewPropTypes,
    behavior: oneOf(['height', 'padding', 'position']),
    contentContainerStyle: ViewPropTypes.style,
    keyboardVerticalOffset: number.isRequired
  };

  static defaultProps = {
    keyboardVerticalOffset: 0
  };

  frame: ?ViewLayout = null;

  relativeKeyboardHeight(keyboardFrame: Object): number {
    const frame = this.frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }
    const keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
    return Math.max(frame.y + frame.height - keyboardY, 0);
  }

  onKeyboardChange(event: Object) {}

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
      ...rest
    } = this.props;

    return <View onLayout={this.onLayout} {...rest} />;
  }
}

export default KeyboardAvoidingView;
