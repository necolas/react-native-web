/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../ColorPropType';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import { arrayOf, bool, func, number, oneOf, string } from 'prop-types';
import React, { Component } from 'react';

class RefreshControl extends Component<*> {
  static propTypes = {
    ...ViewPropTypes,
    colors: arrayOf(ColorPropType),
    enabled: bool,
    onRefresh: func,
    progressBackgroundColor: ColorPropType,
    progressViewOffset: number,
    refreshing: bool.isRequired,
    size: oneOf([0, 1]),
    tintColor: ColorPropType,
    title: string,
    titleColor: ColorPropType
  };

  render() {
    const {
      /* eslint-disable */
      colors,
      enabled,
      onRefresh,
      progressBackgroundColor,
      progressViewOffset,
      refreshing,
      size,
      tintColor,
      title,
      titleColor,
      /* eslint-enable */
      ...rest
    } = this.props;

    return <View {...rest} />;
  }
}

export default RefreshControl;
