import { PropTypes } from 'react'
import BorderPropTypes from '../../apis/StyleSheet/BorderPropTypes'
import ColorPropType from '../../apis/StyleSheet/ColorPropType'
import LayoutPropTypes from '../../apis/StyleSheet/LayoutPropTypes'
import TransformPropTypes from '../../apis/StyleSheet/TransformPropTypes'
import ImageResizeMode from './ImageResizeMode'

const hiddenOrVisible = PropTypes.oneOf([ 'hidden', 'visible' ])

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
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
}
