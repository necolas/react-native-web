/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import AnimationPropTypes from '../../propTypes/AnimationPropTypes';
import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';
import { number, oneOf, oneOfType, string } from 'prop-types';

const ViewStylePropTypes = {
  ...AnimationPropTypes,
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backgroundColor: ColorPropType,
  opacity: number,
  /**
   * @platform unsupported
   */
  elevation: number,
  /**
   * @platform web
   */
  backgroundAttachment: string,
  backgroundBlendMode: string,
  backgroundClip: string,
  backgroundImage: string,
  backgroundOrigin: oneOf(['border-box', 'content-box', 'padding-box']),
  backgroundPosition: string,
  backgroundRepeat: string,
  backgroundSize: string,
  boxShadow: string,
  clip: string,
  cursor: string,
  filter: string,
  outline: string,
  outlineColor: ColorPropType,
  perspective: oneOfType([number, string]),
  perspectiveOrigin: string,
  touchAction: string,
  transitionDelay: string,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string,
  userSelect: string,
  willChange: string,
  WebkitMaskImage: string,
  WebkitOverflowScrolling: oneOf(['auto', 'touch'])
};

export default ViewStylePropTypes;
