/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import type { ColorValue } from '../../types';
import type { ViewProps } from '../View/types';

interface RefreshControlIndicatorProps {
  colors?: Array<ColorValue>;
  enabled?: boolean;
  onRefresh?: () => void | Promise<void>;
  progressBackgroundColor?: ColorValue;
  progressViewOffset?: number;
  refreshing: boolean;
  size?: 0 | 1;
  tintColor?: ColorValue;
  title?: string;
  titleColor?: ColorValue;
}

type RefreshControlProps = ViewProps & RefreshControlIndicatorProps;

export type { RefreshControlIndicatorProps, RefreshControlProps };
