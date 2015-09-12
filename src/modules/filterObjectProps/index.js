function filterProps(obj, props: Array, excluded = false) {
  const filtered = {}
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const isMatch = props.indexOf(prop) > -1
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

export function pickProps(obj, props) {
  return filterProps(obj, props)
}

export function omitProps(obj, props) {
  return filterProps(obj, props, true)
}
