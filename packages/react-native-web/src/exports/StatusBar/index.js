/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StatusBar
 * @flow
 */

import { Component } from 'react';

export default class StatusBar extends Component<*> {
  static setBackgroundColor() {}
  static setBarStyle() {}
  static setHidden() {}
  static setNetworkActivityIndicatorVisible() {}
  static setTranslucent() {}
  static _defaultProps = {
    backgroundColor: {
      value: 'black',
      animated: false
    },
    barStyle: {
      value: 'default',
      animated: false
    },
    translucent: false,
    hidden: {
      value: true,
      animated: false,
      transition: 'fade'
    },
    networkActivityIndicatorVisible: false
  };
  render() {
    return null;
  }
}
