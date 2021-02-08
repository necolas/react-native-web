/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import UIManager from '../UIManager';
import { ReactPackageRegistry } from '../ReactPackage';
const NativeModules = {
  ...ReactPackageRegistry.nativeModules,
  UIManager
};

export default NativeModules;
