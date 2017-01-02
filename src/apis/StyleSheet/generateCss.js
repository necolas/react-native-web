import hyphenate from './hyphenate';
import mapKeyValue from '../../modules/mapKeyValue';
import normalizeValue from './normalizeValue';
import prefixAll from 'inline-style-prefixer/static';

const createDeclarationString = (prop, val) => {
  const name = hyphenate(prop);
  const value = normalizeValue(prop, val);
  if (Array.isArray(val)) {
    return val.map((v) => `${name}:${v}`).join(';');
  }
  return `${name}:${value}`;
};

/**
 * Generates valid CSS rule body from a JS object
 *
 * generateCss({ width: 20, color: 'blue' });
 * // => 'color:blue;width:20px'
 */
const generateCss = (style) => mapKeyValue(prefixAll(style), createDeclarationString).sort().join(';');

module.exports = generateCss;
