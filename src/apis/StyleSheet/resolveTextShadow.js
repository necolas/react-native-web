import normalizeValue from './normalizeValue';

const resolveTextShadow = (style) => {
  if (style && style.textShadowOffset) {
    const { height, width } = style.textShadowOffset;
    const offsetX = normalizeValue(null, height || 0);
    const offsetY = normalizeValue(null, width || 0);
    const blurRadius = normalizeValue(null, style.textShadowRadius || 0);
    const color = style.textShadowColor || 'currentcolor';

    style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    style.textShadowColor = null;
    style.textShadowOffset = null;
    style.textShadowRadius = null;
  }
  return style;
};

module.exports = resolveTextShadow;
