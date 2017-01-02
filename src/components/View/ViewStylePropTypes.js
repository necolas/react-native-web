import AnimationPropTypes from '../../propTypes/AnimationPropTypes';
import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import { PropTypes } from 'react';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';

const { number, oneOf, string } = PropTypes;
const autoOrHiddenOrVisible = oneOf([ 'auto', 'hidden', 'visible' ]);
const hiddenOrVisible = oneOf([ 'hidden', 'visible' ]);

module.exports = process.env.NODE_ENV !== 'production' ? {
  ...AnimationPropTypes,
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  opacity: number,
  overflow: autoOrHiddenOrVisible,
  zIndex: number,
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
  transitionDelay: string,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string,
  userSelect: string,
  visibility: hiddenOrVisible,
  WebkitOverflowScrolling: oneOf([ 'auto', 'touch' ])
} : {};
