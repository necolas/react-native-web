/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

type AnimationType = ?('none' | 'slide' | 'fade');

export type OrientationChangeEvent = {|
  orientation: 'portrait' | 'landscape'
|};

export type PortalProps = {|
  children: any
|};

export type ModalAnimationProps = {|
  children?: any,

  style?: any,

  animated?: ?boolean,
  animationType?: AnimationType,

  visible?: ?boolean,

  onShow?: ?() => void,
  onDismiss?: ?() => void
|};

export type ModalProps = {|
  children: any,

  visible?: ?boolean,

  animated?: ?boolean,
  animationType?: AnimationType,

  presentationStyle?: ?('fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen'),
  transparent?: ?boolean,

  onOrientationChange?: ?(e: OrientationChangeEvent) => void,
  supportedOrientations?: ?Array<
    'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'
  >,

  statusBarTranslucent?: ?boolean,
  hardwareAccelerated?: ?boolean,

  onRequestClose?: ?() => void,
  onShow?: ?() => void,
  onDismiss?: ?() => mixed
|};
