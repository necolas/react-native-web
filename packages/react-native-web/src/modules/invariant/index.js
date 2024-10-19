/* eslint-disable */
'use strict';

var validateFormat =
  process.env.NODE_ENV !== 'production'
    ? function (format) {
        if (format === undefined) {
          throw new Error('invariant(...): Second argument must be a string.');
        }
      }
    : function (format) {};

function invariant(condition, format) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    args[_key - 2] = arguments[_key];
  }

  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
      );
    } else {
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function () {
          return String(args[argIndex++]);
        })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // Skip invariant's own stack frame.

    throw error;
  }
}

export default invariant;
