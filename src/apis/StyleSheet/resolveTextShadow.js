import normalizeValue from './normalizeValue';

const defaultOffset = { height: 0, width: 0 };

const resolveTextShadow = (resolvedStyle, style) => {
  const { height, width } = style.textShadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.textShadowRadius || 0);
  const color = style.textShadowColor || 'currentcolor';

  resolvedStyle.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
};

module.exports = resolveTextShadow;
