/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

const mergeLocalStorageItem = (key, value) => {
  const oldValue = window.localStorage.getItem(key)
  const oldObject = JSON.parse(oldValue)
  const newObject = JSON.parse(value)
  const nextValue = JSON.stringify({ ...oldObject, ...newObject })
  window.localStorage.setItem(key, nextValue)
}

export default class AsyncStorage {
  /**
   * Erases *all* AsyncStorage for the domain.
   */
  static clear() {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.clear()
        resolve(null)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Gets *all* keys known to the app, for all callers, libraries, etc.
   */
  static getAllKeys() {
    return new Promise((resolve, reject) => {
      try {
        const numberOfKeys = window.localStorage.length
        const keys = []
        for (let i = 0; i < numberOfKeys; i += 1) {
          const key = window.localStorage.key(i)
          keys.push(key)
        }
        resolve(keys)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Fetches `key` value.
   */
  static getItem(key: string) {
    return new Promise((resolve, reject) => {
      try {
        const value = window.localStorage.getItem(key)
        resolve(value)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Merges existing value with input value, assuming they are stringified JSON.
   */
  static mergeItem(key: string, value: string) {
    return new Promise((resolve, reject) => {
      try {
        mergeLocalStorageItem(key, value)
        resolve(null)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * multiGet resolves to an array of key-value pair arrays that matches the
   * input format of multiSet.
   *
   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
   */
  static multiGet(keys: Array<string>) {
    const promises = keys.map((key) => AsyncStorage.getItem(key))

    return Promise.all(promises).then(
      (result) => Promise.resolve(result.map((value, i) => [ keys[i], value ])),
      (error) => Promise.reject(error)
    )
  }

  /**
   * Takes an array of key-value array pairs and merges them with existing
   * values, assuming they are stringified JSON.
   *
   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
   */
  static multiMerge(keyValuePairs: Array<Array<string>>) {
    const promises = keyValuePairs.map((item) => AsyncStorage.mergeItem(item[0], item[1]))

    return Promise.all(promises).then(
      () => Promise.resolve(null),
      (error) => Promise.reject(error)
    )
  }

  /**
   * Delete all the keys in the `keys` array.
   */
  static multiRemove(keys: Array<string>) {
    const promises = keys.map((key) => AsyncStorage.removeItem(key))

    return Promise.all(promises).then(
      () => Promise.resolve(null),
      (error) => Promise.reject(error)
    )
  }

  /**
   * Takes an array of key-value array pairs.
   *   multiSet([['k1', 'val1'], ['k2', 'val2']])
   */
  static multiSet(keyValuePairs: Array<Array<string>>) {
    const promises = keyValuePairs.map((item) => AsyncStorage.setItem(item[0], item[1]))

    return Promise.all(promises).then(
      () => Promise.resolve(null),
      (error) => Promise.reject(error)
    )
  }

  /**
   * Removes a `key`
   */
  static removeItem(key: string) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.removeItem(key)
        resolve(null)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Sets `value` for `key`.
   */
  static setItem(key: string, value: string) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, value)
        resolve(null)
      } catch (err) {
        reject(err)
      }
    })
  }
}
