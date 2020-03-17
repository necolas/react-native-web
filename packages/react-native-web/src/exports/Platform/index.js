/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const Platform = {
  OS: 'web',
  select: (obj: Object) => ('web' in obj ? obj.web : obj.default),
  get isTesting(): boolean {
    if (process.env.NODE_DEV === 'test') {
      return true;
    }
    return false;
  },
  get isTV(): boolean {
    return process.env.REACT_APP_IS_TV === "true";
  }
};

export default Platform;
