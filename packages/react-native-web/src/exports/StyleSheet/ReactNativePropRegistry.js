/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const emptyObject = {};
const objects = {};
const prefix = 'r';
let uniqueID = 1;

const createKey = id => `${prefix}-${id}`;

export default class ReactNativePropRegistry {
  static register(object: Object): number {
    const id = uniqueID++;
    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(object);
    }
    const key = createKey(id);
    objects[key] = object;
    return id;
  }

  static getByID(id: number): Object {
    if (!id) {
      // Used in the style={[condition && id]} pattern,
      // we want it to be a no-op when the value is false or null
      return emptyObject;
    }
    const key = createKey(id);
    const object = objects[key];
    if (!object) {
      console.warn('Invalid style with id `' + id + '`. Skipping ...');
      return emptyObject;
    }
    return object;
  }
}
