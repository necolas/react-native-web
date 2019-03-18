/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import View from '../View';
import { number, oneOf } from 'prop-types';
import React, { Component } from 'react';
import ViewPropTypes, { type ViewLayout, type ViewLayoutEvent } from '../ViewPropTypes';

class KeyboardAvoidingView extends Component<*> {
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

  onLayout = (event: ViewLayoutEvent) => {
    this.frame = event.nativeEvent.layout;
  };

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
