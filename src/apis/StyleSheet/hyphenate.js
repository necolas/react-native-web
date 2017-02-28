const cache = {};
const MS_REGEXP = /^ms-/;
const UPPERCASE_REGEXP = /([A-Z])/g;

const hyphenateStyleProp = prop => {
  if (!cache.hasOwnProperty(prop)) {
    cache[prop] = prop.replace(UPPERCASE_REGEXP, '-$&').toLowerCase().replace(MS_REGEXP, '-ms-');
  }
  return cache[prop];
};

module.exports = hyphenateStyleProp;
