/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
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
import { number, oneOf, string } from 'prop-types';

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
  outline: string,
  outlineColor: ColorPropType,
  overscrollBehavior: overscrollBehaviorType,
  overscrollBehaviorX: overscrollBehaviorType,
  overscrollBehaviorY: overscrollBehaviorType,
  WebkitMaskImage: string,
  WebkitOverflowScrolling: oneOf(['auto', 'touch'])
};

export default ViewStylePropTypes;
