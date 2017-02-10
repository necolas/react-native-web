import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import ImageResizeMode from './ImageResizeMode';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import { PropTypes } from 'react';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';

const hiddenOrVisible = PropTypes.oneOf([ 'hidden', 'visible' ]);

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  resizeMode: PropTypes.oneOf(Object.keys(ImageResizeMode)),
  /**
   * @platform web
   */
  boxShadow: PropTypes.string,
  opacity: PropTypes.number,
  overflow: hiddenOrVisible,
  /**
   * @platform web
   */
  visibility: hiddenOrVisible
};
