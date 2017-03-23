import normalizeValue from './normalizeValue';
import processColor from '../../modules/processColor';

const defaultOffset = { height: 0, width: 0 };

// TODO: add inset and spread support
const resolveBoxShadow = (resolvedStyle, style) => {
  const { height, width } = style.shadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.shadowRadius || 0);
  const color = processColor(style.shadowColor, style.shadowOpacity);

  if (color) {
    const boxShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    resolvedStyle.boxShadow = style.boxShadow ? `${style.boxShadow}, ${boxShadow}` : boxShadow;
  } else if (style.boxShadow) {
    resolvedStyle.boxShadow = style.boxShadow;
  }
};

module.exports = resolveBoxShadow;
