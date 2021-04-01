/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createPrefixer from 'inline-style-prefixer/lib/createPrefixer';
import staticData from './static';

type StyleModifier = (style: Object) => Object;

const prefixAll: StyleModifier = createPrefixer(staticData);

export const prefixInlineStyles: StyleModifier = (style) => {
  const prefixedStyles = prefixAll(style);

  // React@15 removed undocumented support for fallback values in
  // inline-styles. Revert array values to the standard CSS value
  Object.keys(prefixedStyles).forEach((prop) => {
    const value = prefixedStyles[prop];
    if (Array.isArray(value)) {
      prefixedStyles[prop] = value[value.length - 1];
    }
  });

  return prefixedStyles;
};

export default prefixAll;
