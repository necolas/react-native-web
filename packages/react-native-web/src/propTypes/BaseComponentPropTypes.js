/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { array, bool, number, object, oneOf, oneOfType, string } from 'prop-types';

const BaseComponentPropTypes = {
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: string,
  accessible: bool,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  style: oneOfType([array, number, object]),
  testID: string,
  // compatibility with React Native
  accessibilityComponentType: string,
  accessibilityTraits: oneOfType([array, string])
};

export default BaseComponentPropTypes;
