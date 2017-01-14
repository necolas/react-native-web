import normalizeColor from 'normalize-css-color';
import normalizeValue from './normalizeValue';

const defaultOffset = { height: 0, width: 0 };

const applyOpacity = (color, opacity = 1) => {
  const nullableColor = normalizeColor(color);
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);
  const alpha = a.toFixed(2);
  return `rgba(${r},${g},${b},${alpha * opacity})`;
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
