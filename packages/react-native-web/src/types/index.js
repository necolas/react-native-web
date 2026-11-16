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

export type GenericStyleProp<out T> =
  | null
  | void
  | Readonly<T>
  | false
  | ''
  | ReadonlyArray<GenericStyleProp<T>>;

export type LayoutValue = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type LayoutEvent = {
  nativeEvent: {
    layout: LayoutValue,
    target?: Element
  },
  timeStamp: number
};

export type MeasureOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void;

export type MeasureLayoutOnSuccessCallback = (
  left: number,
  top: number,
  width: number,
  height: number
) => void;

export type MeasureInWindowOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number
) => void;

// Mixin to HTMLElement that represents additions from `setPlatformMethods`
export interface PlatformMethods {
  blur: () => void;
  focus: () => void;
  measure: (callback: MeasureOnSuccessCallback) => void;
  measureInWindow: (callback: MeasureInWindowOnSuccessCallback) => void;
  measureLayout: (
    relativeToNativeNode: HTMLElement,
    onSuccess: MeasureLayoutOnSuccessCallback,
    onFail: () => void
  ) => void;
  setNativeProps: (props: { [key: string]: unknown, ... }) => void;
}

// Host element with the methods added by `setPlatformMethods`
export type HostNode = HTMLElement & PlatformMethods;
