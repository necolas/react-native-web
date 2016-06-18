'use strict';

// { scale: 2 } => 'scale(2)'
var mapTransform = function mapTransform(transform) {
  var key = Object.keys(transform)[0];
  return key + '(' + transform[key] + ')';
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
var convertTransformMatrix = function convertTransformMatrix(transformMatrix) {
  var matrix = transformMatrix.join(',');
  return 'matrix3d(' + matrix + ')';
};

var processTransform = function processTransform(style) {
  if (style) {
    if (style.transform) {
      style.transform = style.transform.map(mapTransform).join(' ');
    } else if (style.transformMatrix) {
      style.transform = convertTransformMatrix(style.transformMatrix);
      delete style.transformMatrix;
    }
  }
  return style;
};

module.exports = processTransform;