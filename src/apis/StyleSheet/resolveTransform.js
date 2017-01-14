import normalizeValue from './normalizeValue';

// { scale: 2 } => 'scale(2)'
 // { translateX: 20 } => 'translateX(20px)'
const mapTransform = (transform) => {
  const type = Object.keys(transform)[0];
  const value = normalizeValue(type, transform[type]);
  return `${type}(${value})`;
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
const convertTransformMatrix = (transformMatrix) => {
  const matrix = transformMatrix.join(',');
  return `matrix3d(${matrix})`;
};

const resolveTransform = (resolvedStyle, style) => {
  if (Array.isArray(style.transform)) {
    const transform = style.transform.map(mapTransform).join(' ');
    resolvedStyle.transform = transform;
  } else if (style.transformMatrix) {
    const transform = convertTransformMatrix(style.transformMatrix);
    resolvedStyle.transform = transform;
  }
};

module.exports = resolveTransform;
