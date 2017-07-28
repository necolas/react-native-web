function flattenArray(array) {
  function flattenDown(array, result) {
    for (let i = 0; i < array.length; i++) {
      const value = array[i];

      if (Array.isArray(value)) {
        flattenDown(value, result);
      } else if (value != null && value !== false) {
        result.push(value);
      }
    }

    return result;
  }
  return flattenDown(array, []);
}

export default flattenArray;
