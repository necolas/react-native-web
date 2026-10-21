/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const Platform = {
  OS: 'web',
  Version: '0.0.0',
  isDisableAnimations: false,
  isTV: false,

  constants: {
    reactNativeVersion: {
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: undefined
    }
  },

  select(spec: Object): any {
    return 'web' in spec ? spec.web : spec.default;
  },

  get isTesting(): boolean {
    return process.env.NODE_ENV === 'test';
  }
};

export default Platform;
