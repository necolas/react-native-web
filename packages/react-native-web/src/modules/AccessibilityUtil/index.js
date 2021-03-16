/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import buttonLikeRoles, { isButtonLikeRole } from './buttonLikeRoles';
import isDisabled from './isDisabled';
import propsToAccessibilityComponent from './propsToAccessibilityComponent';
import propsToAriaRole from './propsToAriaRole';

const AccessibilityUtil = {
  buttonLikeRoles,
  isButtonLikeRole,
  isDisabled,
  propsToAccessibilityComponent,
  propsToAriaRole
};

export default AccessibilityUtil;
