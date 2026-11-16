/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import UIManager from '../UIManager';

// NativeModules shim
const NativeModules: { UIManager: typeof UIManager } = {
  UIManager
};

export default NativeModules;
