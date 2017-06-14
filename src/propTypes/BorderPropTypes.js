import ColorPropType from './ColorPropType';
import { number, oneOf, oneOfType, string } from 'prop-types';

const numberOrString = oneOfType([number, string]);
const BorderStylePropType = oneOf(['solid', 'dotted', 'dashed']);

const BorderPropTypes = {
  borderColor: ColorPropType,
  borderTopColor: ColorPropType,
  borderRightColor: ColorPropType,
  borderBottomColor: ColorPropType,
  borderLeftColor: ColorPropType,
  borderRadius: numberOrString,
  borderTopLeftRadius: numberOrString,
  borderTopRightRadius: numberOrString,
  borderBottomLeftRadius: numberOrString,
  borderBottomRightRadius: numberOrString,
  borderStyle: BorderStylePropType,
  borderTopStyle: BorderStylePropType,
  borderRightStyle: BorderStylePropType,
  borderBottomStyle: BorderStylePropType,
  borderLeftStyle: BorderStylePropType
};

export default BorderPropTypes;
