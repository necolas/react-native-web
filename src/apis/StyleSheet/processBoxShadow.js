import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';

const applyOpacity = (color, opacity) => {
  const normalizedColor = normalizeColor(color);
  const colorNumber = normalizedColor === null ? 0x00000000 : normalizedColor;
  const r = (colorNumber & 0xff000000) >>> 24;
  const g = (colorNumber & 0x00ff0000) >>> 16;
  const b = (colorNumber & 0x0000ff00) >>> 8;
  const a = (((colorNumber & 0x000000ff) >>> 0) / 255).toFixed(2);
  return `rgba(${r},${g},${b},${a * opacity})`;
};

// TODO: add inset and spread support
const processBoxShadow = (style) => {
  if (style && style.shadowColor) {
    const { height, width } = style.shadowOffset || {};
    const opacity = style.shadowOpacity != null ? style.shadowOpacity : 1;
    const color = applyOpacity(style.shadowColor, opacity);
    const blurRadius = normalizeValue(null, style.shadowRadius || 0);
    const offsetX = normalizeValue(null, height || 0);
    const offsetY = normalizeValue(null, width || 0);
    const boxShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${boxShadow}` : boxShadow;
  }
  delete style.shadowColor;
  delete style.shadowOffset;
  delete style.shadowOpacity;
  delete style.shadowRadius;
  return style;
};

module.exports = processBoxShadow;
