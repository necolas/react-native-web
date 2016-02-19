import { PropTypes } from 'react'
import ColorPropType from '../../apis/StyleSheet/ColorPropType'
import LayoutPropTypes from '../../apis/StyleSheet/LayoutPropTypes'
import TransformPropTypes from '../../apis/StyleSheet/TransformPropTypes'

const hiddenOrVisible = PropTypes.oneOf([ 'hidden', 'visible' ])

export default {
  ...LayoutPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
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
