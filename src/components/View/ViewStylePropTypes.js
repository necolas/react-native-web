import { PropTypes } from 'react'
import BorderPropTypes from '../../propTypes/BorderPropTypes'
import ColorPropType from '../../propTypes/ColorPropType'
import LayoutPropTypes from '../../propTypes/LayoutPropTypes'
import TransformPropTypes from '../../propTypes/TransformPropTypes'

const { number, oneOf, string } = PropTypes
const autoOrHiddenOrVisible = oneOf([ 'auto', 'hidden', 'visible' ])
const hiddenOrVisible = oneOf([ 'hidden', 'visible' ])

module.exports = {
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
  transition: string,
  userSelect: string,
  visibility: hiddenOrVisible,
  zIndex: number
}
