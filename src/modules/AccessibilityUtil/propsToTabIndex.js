/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import propsToAriaRole from './propsToAriaRole';

const propsToTabIndex = props => {
  const ariaRole = propsToAriaRole(props);
  const focusable =
    props.disabled !== true &&
    props.importantForAccessibility !== 'no' &&
    props.importantForAccessibility !== 'no-hide-descendants';
  const focusableRole = ariaRole === 'button' || ariaRole === 'link';

  if (focusableRole) {
    if (props.accessible === false || !focusable) {
      return '-1';
    }
  } else {
    if (props.accessible === true && focusable) {
      return '0';
    }
  }
};

export default propsToTabIndex;
