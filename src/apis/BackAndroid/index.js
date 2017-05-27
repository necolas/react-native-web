/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * web stub for BackAndroid.android.js
 *
 * @flow
 */

function emptyFunction() {}

const BackAndroid = {
  exitApp: emptyFunction,
  addEventListener() {
    return {
      remove: emptyFunction
    };
  },
  removeEventListener: emptyFunction
};

module.exports = BackAndroid;
