import ColorPropType from './ColorPropType';
import { number, oneOfType, shape, string } from 'prop-types';
const numberOrString = oneOfType([number, string]);

const ShadowPropTypes = {
  shadowColor: ColorPropType,
  shadowOffset: shape({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};

export default ShadowPropTypes;
