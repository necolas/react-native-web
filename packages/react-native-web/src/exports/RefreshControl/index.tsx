/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';

import type { ColorValue } from '../../types';
import View, { type ViewProps } from '../View';

type RefreshControlProps = ViewProps & {
  colors?: Array<ColorValue>;
  enabled?: boolean;
  onRefresh?: () => void;
  progressBackgroundColor?: ColorValue;
  progressViewOffset?: number;
  refreshing: boolean;
  size?: 0 | 1;
  tintColor?: ColorValue;
  title?: string;
  titleColor?: ColorValue;
};

function RefreshControl(props: RefreshControlProps): ReactNode {
  const {
    /* oxlint-disable no-unused-vars */
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
    /* oxlint-enable no-unused-vars */
    ...rest
  } = props;

  return <View {...rest} />;
}

export default RefreshControl;
