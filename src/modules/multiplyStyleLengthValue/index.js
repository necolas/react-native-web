const CSS_UNIT_RE = /^[+-]?\d*(?:\.\d+)?(?:[Ee][+-]?\d+)?(%|\w*)/;

const getUnit = str => str.match(CSS_UNIT_RE)[1];

const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const multiplyStyleLengthValue = (value: String | Number, multiple) => {
  if (typeof value === 'string') {
    const number = parseFloat(value, 10) * multiple;
    const unit = getUnit(value);
    return `${number}${unit}`;
  } else if (isNumeric(value)) {
    return value * multiple;
  }
};

export default multiplyStyleLengthValue;
