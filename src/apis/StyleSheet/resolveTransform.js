import normalizeValue from './normalizeValue';

// [ { perspective: 20 }, { scale: 2 }, { translateX: 20 } ]
// => { perspective: 20px, transform: 'scale(2) translateX(20px)' }
const reduceTransform = (resolvedStyle, transform) => {
  const type = Object.keys(transform)[0];
  const value = normalizeValue(type, transform[type]);

  if (type === 'perspective') {
    resolvedStyle.perspective = value;
  } else {
    const result = `${type}(${value})`;
    if (resolvedStyle.transform) {
      resolvedStyle.transform += ` ${result}`;
    } else {
      resolvedStyle.transform = result;
    }
  }
  return resolvedStyle;
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
const convertTransformMatrix = (transformMatrix) => {
  const matrix = transformMatrix.join(',');
  return `matrix3d(${matrix})`;
};

const resolveTransform = (resolvedStyle, style) => {
  if (Array.isArray(style.transform)) {
    style.transform.reduce(reduceTransform, resolvedStyle);
  } else if (style.transformMatrix) {
    const transform = convertTransformMatrix(style.transformMatrix);
    resolvedStyle.transform = transform;
  }
};

module.exports = resolveTransform;
