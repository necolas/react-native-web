import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import ImageResizeMode from './ImageResizeMode';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import { PropTypes } from 'react';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';

const { number, oneOf, string } = PropTypes;
const hiddenOrVisible = oneOf([ 'hidden', 'visible' ]);

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  opacity: number,
  overflow: hiddenOrVisible,
  resizeMode: oneOf(Object.keys(ImageResizeMode)),
  /**
   * @platform unsupported
   */
  overlayColor: string,
  tintColor: ColorPropType,
  /**
   * @platform web
   */
  boxShadow: string,
  visibility: hiddenOrVisible
};
