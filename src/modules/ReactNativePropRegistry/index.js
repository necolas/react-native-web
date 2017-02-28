/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativePropRegistry
 * @flow
 */
'use strict';

const emptyObject = {};
const objects = {};
const prefix = 'r';
let uniqueID = 1;

const createKey = id => `${prefix}-${id}`;

class ReactNativePropRegistry {
  static register(object: Object): number {
    let id = uniqueID++;
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

module.exports = ReactNativePropRegistry;
