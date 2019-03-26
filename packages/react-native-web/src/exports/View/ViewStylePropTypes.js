/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import AnimationPropTypes from '../../modules/AnimationPropTypes';
import BorderPropTypes from '../../modules/BorderPropTypes';
import ColorPropType from '../ColorPropType';
import InteractionPropTypes from '../../modules/InteractionPropTypes';
import LayoutPropTypes from '../../modules/LayoutPropTypes';
import ShadowPropTypes from '../../modules/ShadowPropTypes';
import TransformPropTypes from '../../modules/TransformPropTypes';
import { number, oneOf, oneOfType, string } from 'prop-types';

const stringOrNumber = oneOfType([string, number]);
const overscrollBehaviorType = oneOf(['auto', 'contain', 'none']);

const ViewStylePropTypes = {
  ...AnimationPropTypes,
  ...BorderPropTypes,
  ...InteractionPropTypes,
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
  backdropFilter: string,
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
  filter: string,
  outlineColor: ColorPropType,
  outlineOffset: stringOrNumber,
  outlineStyle: string,
  outlineWidth: stringOrNumber,
  overscrollBehavior: overscrollBehaviorType,
  overscrollBehaviorX: overscrollBehaviorType,
  overscrollBehaviorY: overscrollBehaviorType,
  scrollbarWidth: oneOf(['auto', 'none']),
  scrollSnapAlign: string,
  scrollSnapType: string,
  WebkitMaskImage: string,
  WebkitOverflowScrolling: oneOf(['auto', 'touch'])
};

export default ViewStylePropTypes;
