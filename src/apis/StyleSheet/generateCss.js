import hyphenateStyleName from 'hyphenate-style-name';
import mapKeyValue from '../../modules/mapKeyValue';
import normalizeValue from './normalizeValue';
import prefixStyles from '../../modules/prefixStyles';

const createDeclarationString = (prop, val) => {
  const name = hyphenateStyleName(prop);
  const value = normalizeValue(prop, val);
  if (Array.isArray(val)) {
    return val.map(v => `${name}:${v}`).join(';');
  }
  return `${name}:${value}`;
};

/**
 * Generates valid CSS rule body from a JS object
 *
 * generateCss({ width: 20, color: 'blue' });
 * // => 'color:blue;width:20px'
 */
const generateCss = style =>
  mapKeyValue(prefixStyles(style), createDeclarationString).sort().join(';');

export default generateCss;
