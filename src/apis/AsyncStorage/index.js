/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AsyncStorage
 * @flow
 */

import merge from 'deep-assign';

const mergeLocalStorageItem = (key, value) => {
  const oldValue = window.localStorage.getItem(key);
  const oldObject = JSON.parse(oldValue);
  const newObject = JSON.parse(value);
  const nextValue = JSON.stringify(merge({}, oldObject, newObject));
  window.localStorage.setItem(key, nextValue);
};

const createPromise = (getValue, callback) => {
  return new Promise((resolve, reject) => {
    try {
      const value = getValue();
      if (callback) {
        callback(null, value);
      }
      resolve(value);
    } catch (err) {
      if (callback) {
        callback(err);
      }
      reject(err);
    }
  });
};

const createPromiseAll = (promises, callback, processResult) => {
  return Promise.all(promises).then(
    result => {
      const value = processResult ? processResult(result) : null;
      callback && callback(null, value);
      return Promise.resolve(value);
    },
    errors => {
      callback && callback(errors);
      return Promise.reject(errors);
    }
  );
};

export default class AsyncStorage {
  /**
   * Erases *all* AsyncStorage for the domain.
   */
  static clear(callback) {
    return createPromise(() => {
      window.localStorage.clear();
    }, callback);
  }

  /**
   * (stub) Flushes any pending requests using a single batch call to get the data.
   */
  static flushGetRequests() {}

  /**
   * Gets *all* keys known to the app, for all callers, libraries, etc.
   */
  static getAllKeys(callback) {
    return createPromise(() => {
      const numberOfKeys = window.localStorage.length;
      const keys = [];
      for (let i = 0; i < numberOfKeys; i += 1) {
        const key = window.localStorage.key(i);
        keys.push(key);
      }
      return keys;
    }, callback);
  }

  /**
   * Fetches `key` value.
   */
  static getItem(key: string, callback) {
    return createPromise(() => {
      return window.localStorage.getItem(key);
    }, callback);
  }

  /**
   * multiGet resolves to an array of key-value pair arrays that matches the
   * input format of multiSet.
   *
   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
   */
  static multiGet(keys: Array<string>, callback) {
    const promises = keys.map(key => AsyncStorage.getItem(key));
    const processResult = result => result.map((value, i) => [keys[i], value]);
    return createPromiseAll(promises, callback, processResult);
  }

  /**
   * Sets `value` for `key`.
   */
  static setItem(key: string, value: string, callback) {
    return createPromise(() => {
      window.localStorage.setItem(key, value);
    }, callback);
  }

  /**
   * Takes an array of key-value array pairs.
   *   multiSet([['k1', 'val1'], ['k2', 'val2']])
   */
  static multiSet(keyValuePairs: Array<Array<string>>, callback) {
    const promises = keyValuePairs.map(item => AsyncStorage.setItem(item[0], item[1]));
    return createPromiseAll(promises, callback);
  }

  /**
   * Merges existing value with input value, assuming they are stringified JSON.
   */
  static mergeItem(key: string, value: string, callback) {
    return createPromise(() => {
      mergeLocalStorageItem(key, value);
    }, callback);
  }

  /**
   * Takes an array of key-value array pairs and merges them with existing
   * values, assuming they are stringified JSON.
   *
   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
   */
  static multiMerge(keyValuePairs: Array<Array<string>>, callback) {
    const promises = keyValuePairs.map(item => AsyncStorage.mergeItem(item[0], item[1]));
    return createPromiseAll(promises, callback);
  }

  /**
   * Removes a `key`
   */
  static removeItem(key: string, callback) {
    return createPromise(() => {
      return window.localStorage.removeItem(key);
    }, callback);
  }

  /**
   * Delete all the keys in the `keys` array.
   */
  static multiRemove(keys: Array<string>, callback) {
    const promises = keys.map(key => AsyncStorage.removeItem(key));
    return createPromiseAll(promises, callback);
  }
}
