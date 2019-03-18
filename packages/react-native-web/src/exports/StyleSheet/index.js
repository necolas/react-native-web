/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import StyleSheet from './StyleSheet';

// allow original component styles to be inspected in React Dev Tools
if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

export default StyleSheet;
