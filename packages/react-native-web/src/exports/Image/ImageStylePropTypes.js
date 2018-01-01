/**
 * @flow
 */

import BorderPropTypes from '../../modules/BorderPropTypes';
import ColorPropType from '../ColorPropType';
import ImageResizeMode from './ImageResizeMode';
import LayoutPropTypes from '../../modules/LayoutPropTypes';
import ShadowPropTypes from '../../modules/ShadowPropTypes';
import TransformPropTypes from '../../modules/TransformPropTypes';
import { number, oneOf, string } from 'prop-types';

const ImageStylePropTypes = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backgroundColor: ColorPropType,
  opacity: number,
  resizeMode: oneOf(Object.keys(ImageResizeMode)),
  /**
   * @platform unsupported
   */
  overlayColor: string,
  tintColor: ColorPropType,
  /**
   * @platform web
   */
  boxShadow: string
};

export default ImageStylePropTypes;
