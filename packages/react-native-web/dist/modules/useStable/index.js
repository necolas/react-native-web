/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
var UNINITIALIZED = typeof Symbol === 'function' && typeof Symbol() === 'symbol' ? Symbol() : Object.freeze({});
export default function useStable(getInitialValue) {
  var ref = React.useRef(UNINITIALIZED);

  if (ref.current === UNINITIALIZED) {
    ref.current = getInitialValue();
  } // $FlowFixMe (#64650789) Trouble refining types where `Symbol` is concerned.


  return ref.current;
}