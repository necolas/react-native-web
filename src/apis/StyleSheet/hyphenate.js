const RE_1 = /([A-Z])/g;
const RE_2 = /^ms-/;
module.exports = (s) => s.replace(RE_1, '-$1').toLowerCase().replace(RE_2, '-ms-');
