import { PropTypes } from 'react'
import BorderPropTypes from '../../propTypes/BorderPropTypes'
import ColorPropType from '../../propTypes/ColorPropType'
import LayoutPropTypes from '../../propTypes/LayoutPropTypes'
import TransformPropTypes from '../../propTypes/TransformPropTypes'
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
