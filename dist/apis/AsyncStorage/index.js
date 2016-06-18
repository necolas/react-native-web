"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

var mergeLocalStorageItem = function mergeLocalStorageItem(key, value) {
  var oldValue = window.localStorage.getItem(key);
  var oldObject = JSON.parse(oldValue);
  var newObject = JSON.parse(value);
  var nextValue = JSON.stringify(_extends({}, oldObject, newObject));
  window.localStorage.setItem(key, nextValue);
};

var AsyncStorage = function () {
  function AsyncStorage() {
    _classCallCheck(this, AsyncStorage);
  }

  _createClass(AsyncStorage, null, [{
    key: "clear",

    /**
     * Erases *all* AsyncStorage for the domain.
     */
    value: function clear() {
      return new Promise(function (resolve, reject) {
        try {
          window.localStorage.clear();
          resolve(null);
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * Gets *all* keys known to the app, for all callers, libraries, etc.
     */

  }, {
    key: "getAllKeys",
    value: function getAllKeys() {
      return new Promise(function (resolve, reject) {
        try {
          var numberOfKeys = window.localStorage.length;
          var keys = [];
          for (var i = 0; i < numberOfKeys; i += 1) {
            var key = window.localStorage.key(i);
            keys.push(key);
          }
          resolve(keys);
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * Fetches `key` value.
     */

  }, {
    key: "getItem",
    value: function getItem(key) {
      return new Promise(function (resolve, reject) {
        try {
          var value = window.localStorage.getItem(key);
          resolve(value);
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * Merges existing value with input value, assuming they are stringified JSON.
     */

  }, {
    key: "mergeItem",
    value: function mergeItem(key, value) {
      return new Promise(function (resolve, reject) {
        try {
          mergeLocalStorageItem(key, value);
          resolve(null);
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * multiGet resolves to an array of key-value pair arrays that matches the
     * input format of multiSet.
     *
     *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
     */

  }, {
    key: "multiGet",
    value: function multiGet(keys) {
      var promises = keys.map(function (key) {
        return AsyncStorage.getItem(key);
      });

      return Promise.all(promises).then(function (result) {
        return Promise.resolve(result.map(function (value, i) {
          return [keys[i], value];
        }));
      }, function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Takes an array of key-value array pairs and merges them with existing
     * values, assuming they are stringified JSON.
     *
     *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
     */

  }, {
    key: "multiMerge",
    value: function multiMerge(keyValuePairs) {
      var promises = keyValuePairs.map(function (item) {
        return AsyncStorage.mergeItem(item[0], item[1]);
      });

      return Promise.all(promises).then(function () {
        return Promise.resolve(null);
      }, function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Delete all the keys in the `keys` array.
     */

  }, {
    key: "multiRemove",
    value: function multiRemove(keys) {
      var promises = keys.map(function (key) {
        return AsyncStorage.removeItem(key);
      });

      return Promise.all(promises).then(function () {
        return Promise.resolve(null);
      }, function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Takes an array of key-value array pairs.
     *   multiSet([['k1', 'val1'], ['k2', 'val2']])
     */

  }, {
    key: "multiSet",
    value: function multiSet(keyValuePairs) {
      var promises = keyValuePairs.map(function (item) {
        return AsyncStorage.setItem(item[0], item[1]);
      });

      return Promise.all(promises).then(function () {
        return Promise.resolve(null);
      }, function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Removes a `key`
     */

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      return new Promise(function (resolve, reject) {
        try {
          window.localStorage.removeItem(key);
          resolve(null);
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * Sets `value` for `key`.
     */

  }, {
    key: "setItem",
    value: function setItem(key, value) {
      return new Promise(function (resolve, reject) {
        try {
          window.localStorage.setItem(key, value);
          resolve(null);
        } catch (err) {
          reject(err);
        }
      });
    }
  }]);

  return AsyncStorage;
}();

module.exports = AsyncStorage;