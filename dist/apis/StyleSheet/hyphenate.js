'use strict';

module.exports = function (string) {
  return string.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^ms-/, '-ms-');
};