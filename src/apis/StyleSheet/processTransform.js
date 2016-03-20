// { scale: 2 } => 'scale(2)'
const mapTransform = (transform) => {
  var key = Object.keys(transform)[0]
  return `${key}(${transform[key]})`
}

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
const convertTransformMatrix = (transformMatrix) => {
  var matrix = transformMatrix.join(',')
  return `matrix3d(${matrix})`
}

const processTransform = (style) => {
  if (style) {
    if (style.transform) {
      style.transform = style.transform.map(mapTransform).join(' ')
    } else if (style.transformMatrix) {
      style.transform = convertTransformMatrix(style.transformMatrix)
      delete style.transformMatrix
    }
  }
  return style
}

module.exports = processTransform
