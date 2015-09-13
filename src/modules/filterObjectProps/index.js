function filterProps(obj, propKeys: Array, excluded = false) {
  const filtered = {}
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const isMatch = propKeys.indexOf(prop) > -1
      if (excluded && isMatch) {
        continue
      } else if (!excluded && !isMatch) {
        continue
      }

      filtered[prop] = obj[prop]
    }
  }

  return filtered
}

export function pickProps(obj, propKeys) {
  return filterProps(obj, propKeys)
}

export function omitProps(obj, propKeys) {
  return filterProps(obj, propKeys, true)
}
