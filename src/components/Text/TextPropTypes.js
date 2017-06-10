/**
 * @flow
 */

import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { any, bool, func, number, oneOf } from 'prop-types';

const TextPropTypes = {
  ...BaseComponentPropTypes,
  accessibilityRole: oneOf(['button', 'heading', 'link', 'listitem']),
  children: any,
  numberOfLines: number,
  onLayout: func,
  onPress: func,
  selectable: bool,
  style: StyleSheetPropType(TextStylePropTypes)
};

export default TextPropTypes;
