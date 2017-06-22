/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule dismissKeyboard
 * @flow
 */

import TextInputState from '../../components/TextInput/TextInputState';

const dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};

export default dismissKeyboard;
