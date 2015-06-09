/**
 * Extract all props that are not part of the React Component's 'propTypes'
 */
export default (componentInstance) => {
  const excludedProps = Object.keys(componentInstance.constructor.propTypes);
  return objectWithoutProps(componentInstance.props, excludedProps);
};

function objectFilterProps(obj, props, excluded=false) {
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

export function objectWithProps(obj, props) {
  return objectFilterProps(obj, props);
}

export function objectWithoutProps(obj, props) {
  return objectFilterProps(obj, props, true);
}
