import normalizeValue from './normalizeValue';
import processColor from '../../modules/processColor';

const defaultOffset = { height: 0, width: 0 };

const resolveTextShadow = (resolvedStyle, style) => {
  const { height, width } = style.textShadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.textShadowRadius || 0);
  const color = processColor(style.textShadowColor);

  if (color) {
    resolvedStyle.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

module.exports = resolveTextShadow;
