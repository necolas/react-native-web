/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function emptyFunction() {}

const BackHandler = {
  exitApp: emptyFunction,
  /**
   * Listen to "hardwareBackPress" event
   *
   * @param event
   * @param callback
   * @returns {{remove: remove}}
   */
  addEventListener(event: string, callback: Function) {
    document.addEventListener(event, callback);
    return {
      remove: () => {
        document.removeEventListener(event, callback);
      }
    };
  },
  removeEventListener: emptyFunction
};

export default BackHandler;
