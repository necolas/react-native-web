import AnimationPropTypes from '../../propTypes/AnimationPropTypes';
import BorderPropTypes from '../../propTypes/BorderPropTypes';
import ColorPropType from '../../propTypes/ColorPropType';
import LayoutPropTypes from '../../propTypes/LayoutPropTypes';
import ShadowPropTypes from '../../propTypes/ShadowPropTypes';
import TransformPropTypes from '../../propTypes/TransformPropTypes';
import { number, oneOf, oneOfType, string } from 'prop-types';

module.exports = {
  ...AnimationPropTypes,
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...ShadowPropTypes,
  ...TransformPropTypes,
  backgroundColor: ColorPropType,
  opacity: number,
  /**
   * @platform unsupported
   */
  elevation: number,
  /**
   * @platform web
   */
  backgroundAttachment: string,
  backgroundClip: string,
  backgroundImage: string,
  backgroundOrigin: oneOf(['border-box', 'content-box', 'padding-box']),
  backgroundPosition: string,
  backgroundRepeat: string,
  backgroundSize: string,
  boxShadow: string,
  clip: string,
  cursor: string,
  filter: string,
  outline: string,
  outlineColor: ColorPropType,
  perspective: oneOfType([number, string]),
  perspectiveOrigin: string,
  transitionDelay: string,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string,
  userSelect: string,
  willChange: string,
  WebkitMaskImage: string,
  WebkitOverflowScrolling: oneOf(['auto', 'touch'])
};
