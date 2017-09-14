/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Keyboard
 * @flow
 */

import dismissKeyboard from '../../modules/dismissKeyboard';

const Keyboard = {
  addListener() {
    return { remove: () => {} };
  },
  dismiss() {
    dismissKeyboard();
  },
  removeAllListeners() {},
  removeListener() {}
};

export default Keyboard;
