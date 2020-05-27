/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default function pick(obj: Object, list: { [string]: boolean }): Object {
  const nextObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        list[key] === true ||
        // Temporary until ARIA is mapped to explicit props
        key.indexOf('aria-') === 0
      ) {
        nextObj[key] = obj[key];
      }
    }
  }
  return nextObj;
}
