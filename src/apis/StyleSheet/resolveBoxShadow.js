import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';

const defaultOffset = { height: 0, width: 0 };

const applyOpacity = (color, opacity = 1) => {
  const nullableColor = normalizeColor(color);
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const r = Math.round(((colorInt & 0xff000000) >>> 24));
  const g = Math.round(((colorInt & 0x00ff0000) >>> 16));
  const b = Math.round(((colorInt & 0x0000ff00) >>> 8));
  const a = (((colorInt & 0x000000ff) >>> 0) / 255).toFixed(2);
  return `rgba(${r},${g},${b},${a * opacity})`;
};

// TODO: add inset and spread support
const resolveBoxShadow = (resolvedStyle, style) => {
  const { height, width } = style.shadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.shadowRadius || 0);
  const color = applyOpacity(style.shadowColor, style.shadowOpacity);

  const boxShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  resolvedStyle.boxShadow = style.boxShadow ? `${style.boxShadow}, ${boxShadow}` : boxShadow;
};

module.exports = resolveBoxShadow;
