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
  addEventListener(): {| remove: () => void |} {
    return {
      remove: emptyFunction
    };
  },
  removeEventListener: emptyFunction
};

export default BackHandler;
