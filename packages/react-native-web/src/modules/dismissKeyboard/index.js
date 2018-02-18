/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule dismissKeyboard
 * @flow
 */

import TextInputState from '../TextInputState';

const dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};

export default dismissKeyboard;
