/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ViewPropTypes
 * @flow
 */

import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import EdgeInsetsPropType from '../../propTypes/EdgeInsetsPropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { any, bool, func, oneOf } from 'prop-types';

export type ViewLayout = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type ViewLayoutEvent = {
  nativeEvent: {
    layout: ViewLayout
  }
};

const ViewPropTypes = {
  ...BaseComponentPropTypes,
  children: any,
  collapsable: bool,
  hitSlop: EdgeInsetsPropType,
  onClick: func,
  onClickCapture: func,
  onLayout: func,
  onMoveShouldSetResponder: func,
  onMoveShouldSetResponderCapture: func,
  onResponderGrant: func,
  onResponderMove: func,
  onResponderReject: func,
  onResponderRelease: func,
  onResponderTerminate: func,
  onResponderTerminationRequest: func,
  onStartShouldSetResponder: func,
  onStartShouldSetResponderCapture: func,
  onTouchCancel: func,
  onTouchCancelCapture: func,
  onTouchEnd: func,
  onTouchEndCapture: func,
  onTouchMove: func,
  onTouchMoveCapture: func,
  onTouchStart: func,
  onTouchStartCapture: func,
  pointerEvents: oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: StyleSheetPropType(ViewStylePropTypes)
};

export default ViewPropTypes;
