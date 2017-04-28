import I18nManager from '../I18nManager';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';

const emptyObject = {};

/**
 * Map of property names to their BiDi equivalent.
 */
const PROPERTIES_TO_SWAP = {
  borderTopLeftRadius: 'borderTopRightRadius',
  borderTopRightRadius: 'borderTopLeftRadius',
  borderBottomLeftRadius: 'borderBottomRightRadius',
  borderBottomRightRadius: 'borderBottomLeftRadius',
  borderLeftColor: 'borderRightColor',
  borderLeftStyle: 'borderRightStyle',
  borderLeftWidth: 'borderRightWidth',
  borderRightColor: 'borderLeftColor',
  borderRightWidth: 'borderLeftWidth',
  borderRightStyle: 'borderLeftStyle',
  left: 'right',
  marginLeft: 'marginRight',
  marginRight: 'marginLeft',
  paddingLeft: 'paddingRight',
  paddingRight: 'paddingLeft',
  right: 'left'
};

const PROPERTIES_SWAP_LEFT_RIGHT = {
  clear: true,
  float: true,
  textAlign: true
};

/**
 * Invert the sign of a numeric-like value
 */
const additiveInverse = (value: String | Number) => multiplyStyleLengthValue(value, -1);

/**
 * BiDi flip the given property.
 */
const flipProperty = (prop: String): String => {
  return PROPERTIES_TO_SWAP.hasOwnProperty(prop) ? PROPERTIES_TO_SWAP[prop] : prop;
};

/**
 * BiDi flip translateX
 */
const flipTransform = (transform: Object): Object => {
  const translateX = transform.translateX;
  if (translateX != null) {
    transform.translateX = additiveInverse(translateX);
  }
  return transform;
};

const swapLeftRight = (value: String): String => {
  return value === 'left' ? 'right' : value === 'right' ? 'left' : value;
};

const i18nStyle = originalStyle => {
  if (!I18nManager.isRTL) {
    return originalStyle;
  }

  const style = originalStyle || emptyObject;
  const nextStyle = {};

  for (const prop in style) {
    if (!Object.prototype.hasOwnProperty.call(style, prop)) {
      continue;
    }

    const value = style[prop];

    if (PROPERTIES_TO_SWAP[prop]) {
      const newProp = flipProperty(prop);
      nextStyle[newProp] = value;
    } else if (PROPERTIES_SWAP_LEFT_RIGHT[prop]) {
      nextStyle[prop] = swapLeftRight(value);
    } else if (prop === 'textShadowOffset') {
      nextStyle[prop] = value;
      nextStyle[prop].width = additiveInverse(value.width);
    } else if (prop === 'transform' && Array.isArray(value)) {
      nextStyle[prop] = style[prop].map(flipTransform);
    } else {
      nextStyle[prop] = style[prop];
    }
  }

  return nextStyle;
};

module.exports = i18nStyle;
