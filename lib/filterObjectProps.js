function filterProps(obj, props, excluded=false) {
  if (!Array.isArray(props)) {
    throw new TypeError('props is not an Array');
  }

  let filtered = {};
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      let isMatch = props.indexOf(prop) > -1;
      if (excluded && isMatch) {
        continue;
      } else if (!excluded && !isMatch) {
        continue;
      }

      filtered[prop] = obj[prop];
    }
  }

  return filtered;
}

// Extract all props that are not part of the React Component's 'propTypes'
export function getOtherProps(componentInstance) {
  const excludedProps = Object.keys(componentInstance.constructor.propTypes);
  return omitProps(componentInstance.props, excludedProps);
}

export function pickProps(obj, props) {
  return filterProps(obj, props);
}

export function omitProps(obj, props) {
  return filterProps(obj, props, true);
}
