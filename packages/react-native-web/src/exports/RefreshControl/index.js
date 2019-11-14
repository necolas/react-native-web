/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import View from '../View';
import React from 'react';

type RefreshControlProps = {
  ...ViewProps,
  colors?: Array<ColorValue>,
  enabled?: boolean,
  onRefresh?: () => void,
  progressBackgroundColor?: ColorValue,
  progressViewOffset?: number,
  refreshing: boolean,
  size?: 0 | 1,
  tintColor?: ColorValue,
  title?: string,
  titleColor?: ColorValue
};

class RefreshControl extends React.Component<RefreshControlProps> {
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
