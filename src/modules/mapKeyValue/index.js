const hasOwnProperty = Object.prototype.hasOwnProperty;

const mapKeyValue = (obj, fn) => {
  const result = [];
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      result.push(fn(key, obj[key]));
    }
  }
  return result;
};

module.exports = mapKeyValue;
