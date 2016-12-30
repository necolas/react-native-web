import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';

const defaultOffset = { height: 0, width: 0 };

const applyOpacity = (colorNumber, opacity) => {
  const r = (colorNumber & 0xff000000) >>> 24;
  const g = (colorNumber & 0x00ff0000) >>> 16;
  const b = (colorNumber & 0x0000ff00) >>> 8;
  const a = (((colorNumber & 0x000000ff) >>> 0) / 255).toFixed(2);
  return `rgba(${r},${g},${b},${a * opacity})`;
};

// TODO: add inset and spread support
const resolveBoxShadow = (resolvedStyle, style) => {
  const { height, width } = style.shadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.shadowRadius || 0);
  // rgba color
  const opacity = style.shadowOpacity != null ? style.shadowOpacity : 1;
  const colorNumber = normalizeColor(style.shadowColor) || 0x00000000;
  const color = applyOpacity(colorNumber, opacity);

  const boxShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  resolvedStyle.boxShadow = style.boxShadow ? `${style.boxShadow}, ${boxShadow}` : boxShadow;
};

module.exports = resolveBoxShadow;
