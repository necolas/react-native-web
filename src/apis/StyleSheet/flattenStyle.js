/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule flattenStyle
 * @flow
 */
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import invariant from 'fbjs/lib/invariant';

type Atom = number | boolean | Object | Array<?Atom>;
type StyleObj = Atom;

function getStyle(style) {
  if (typeof style === 'number') {
    return ReactNativePropRegistry.getByID(style);
  }
  return style;
}

function flattenStyle(style: ?StyleObj): ?Object {
  if (!style) {
    return undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    invariant(style !== true, 'style may be false but not true');
  }

  if (!Array.isArray(style)) {
    return getStyle(style);
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        const value = computedStyle[key];
        result[key] = value;
      }
    }
  }
  return result;
}

module.exports = flattenStyle;
