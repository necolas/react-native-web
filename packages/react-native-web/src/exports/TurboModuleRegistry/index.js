/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const NativeModules = require('../NativeModules');

import invariant from 'invariant';

function requireModule(name) {
  const legacyModule = NativeModules[name];
  if (legacyModule != null) {
    return legacyModule;
  }

  return null;
}

function get(name) {
  return requireModule(name);
}

function getEnforcing(name) {
  const module = requireModule(name);
  invariant(
    module != null,
    `TurboModuleRegistry.getEnforcing(...): '${name}' could not be found. ` +
    'Verify that a module by this name is registered in the native binary.',
  );
  return module;
}

var TurboModuleRegistry = {
  get,
  getEnforcing,
};

export default TurboModuleRegistry;
