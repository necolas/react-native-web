import hyphenate from './hyphenate';
import mapKeyValue from '../../modules/mapKeyValue';
import normalizeValue from './normalizeValue';
import prefixAll from 'inline-style-prefixer/static';

const RE_VENDOR = /^-/;

const sortVendorPrefixes = (a, b) => {
  const vendorA = RE_VENDOR.test(a);
  const vendorB = RE_VENDOR.test(b);
  if (vendorA && vendorB || vendorA) {
    return -1;
  } else {
    return 1;
  }
};

const mapDeclaration = (prop, val) => {
  const name = hyphenate(prop);
  const value = normalizeValue(prop, val);
  if (Array.isArray(val)) {
    return val.map((v) => `${name}:${v};`).join('');
  }
  return `${name}:${value};`;
};

/**
 * Generates valid CSS rule body from a JS object
 *
 * generateCss({ width: 20, color: 'blue' });
 * // => 'width:20px;color:blue;'
 */
const generateCss = (style) => {
  const prefixed = prefixAll(style);
  return mapKeyValue(prefixed, mapDeclaration).sort(sortVendorPrefixes).join('');
};

module.exports = generateCss;
