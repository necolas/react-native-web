/**
 * @flow
 */

import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import ImageResizeMode from './ImageResizeMode';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';
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
