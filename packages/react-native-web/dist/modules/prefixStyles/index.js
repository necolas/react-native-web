/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createPrefixer from 'inline-style-prefixer/lib/createPrefixer';
import staticData from './static';
var prefixAll = createPrefixer(staticData);
export var prefixInlineStyles = function prefixInlineStyles(style) {
  var prefixedStyles = prefixAll(style); // React@15 removed undocumented support for fallback values in
  // inline-styles. Revert array values to the standard CSS value

  Object.keys(prefixedStyles).forEach(function (prop) {
    var value = prefixedStyles[prop];

    if (Array.isArray(value)) {
      prefixedStyles[prop] = value[value.length - 1];
    }
  });
  return prefixedStyles;
};
export default prefixAll;