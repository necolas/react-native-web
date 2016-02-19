import { PropTypes } from 'react'
import BorderPropTypes from '../../apis/StyleSheet/BorderPropTypes'
import ColorPropType from '../../apis/StyleSheet/ColorPropType'
import LayoutPropTypes from '../../apis/StyleSheet/LayoutPropTypes'
import TransformPropTypes from '../../apis/StyleSheet/TransformPropTypes'

const { number, oneOf, string } = PropTypes
const autoOrHiddenOrVisible = oneOf([ 'auto', 'hidden', 'visible' ])
const hiddenOrVisible = oneOf([ 'hidden', 'visible' ])

export default {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  opacity: number,
  overflow: autoOrHiddenOrVisible,
  /*
   * @platform web
   */
  backgroundAttachment: string,
  backgroundClip: string,
  backgroundImage: string,
  backgroundPosition: string,
  backgroundOrigin: oneOf([ 'border-box', 'content-box', 'padding-box' ]),
  backgroundRepeat: string,
  backgroundSize: string,
  boxShadow: string,
  cursor: string,
  outline: string,
  overflowX: autoOrHiddenOrVisible,
  overflowY: autoOrHiddenOrVisible,
  userSelect: string,
  visibility: hiddenOrVisible,
  zIndex: number
}
