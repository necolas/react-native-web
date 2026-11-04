/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default function pick(obj: Object, list: Set<string>): Object {
  const nextObj: { [string]: unknown } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (list.has(key)) {
        nextObj[key] = obj[key];
      }
    }
  }
  return nextObj;
}
