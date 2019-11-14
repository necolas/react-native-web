/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type ColorValue = null | string;

export type DimensionValue = null | number | string;

export type EdgeInsetsValue = {|
  top: number,
  left: number,
  right: number,
  bottom: number
|};

export type GenericStyleProp<+T> =
  | null
  | void
  | T
  | false
  | ''
  | $ReadOnlyArray<GenericStyleProp<T>>;

export type LayoutValue = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type LayoutEvent = {
  nativeEvent: {
    layout: LayoutValue
  }
};

export type PointValue = {|
  x: number,
  y: number
|};
