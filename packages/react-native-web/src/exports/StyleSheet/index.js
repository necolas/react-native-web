// @flow

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import StyleSheet from './StyleSheet';

type Atom = number | boolean | Object | Array<?Atom>;
export type StyleObj = Atom;

// allow original component styles to be inspected in React Dev Tools
if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

export default StyleSheet;
