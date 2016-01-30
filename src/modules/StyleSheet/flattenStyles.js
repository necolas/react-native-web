function flattenInto(target, obj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      flattenInto(target, obj[i])
    }
  } else if (obj) {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        target[key] = obj[key]
      }
    }
  }
}

export default (toFlatten) => {
  let target = {}
  flattenInto(target, toFlatten)
  return target
}
