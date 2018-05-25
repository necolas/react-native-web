/**
 * @flow
 */

import AnimationPropTypes from '../../modules/AnimationPropTypes';
import BorderPropTypes from '../../modules/BorderPropTypes';
import ColorPropType from '../ColorPropType';
import ImageResizeMode from './ImageResizeMode';
import InteractionPropTypes from '../../modules/InteractionPropTypes';
import LayoutPropTypes from '../../modules/LayoutPropTypes';
import ShadowPropTypes from '../../modules/ShadowPropTypes';
import TransformPropTypes from '../../modules/TransformPropTypes';
import { number, oneOf, string } from 'prop-types';

const ImageStylePropTypes = {
  ...AnimationPropTypes,
  ...BorderPropTypes,
  ...InteractionPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backgroundColor: ColorPropType,
  opacity: number,
  resizeMode: oneOf(Object.keys(ImageResizeMode)),
  tintColor: ColorPropType,
  /**
   * @platform unsupported
   */
  overlayColor: string,
  /**
   * @platform web
   */
  boxShadow: string,
  filter: string
};

export default ImageStylePropTypes;
