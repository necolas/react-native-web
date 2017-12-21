/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import isDisabled from './isDisabled';
import propsToAccessibilityComponent from './propsToAccessibilityComponent';
import propsToAriaRole from './propsToAriaRole';
import propsToTabIndex from './propsToTabIndex';

const AccessibilityUtil = {
  isDisabled,
  propsToAccessibilityComponent,
  propsToAriaRole,
  propsToTabIndex
};

export default AccessibilityUtil;
