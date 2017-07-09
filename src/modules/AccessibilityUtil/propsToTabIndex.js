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
import propsToAriaRole from './propsToAriaRole';

const propsToTabIndex = (props: Object) => {
  const role = propsToAriaRole(props);
  const focusable =
    !isDisabled(props) &&
    props.importantForAccessibility !== 'no' &&
    props.importantForAccessibility !== 'no-hide-descendants';

  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.
  if (role === 'link') {
    if (props.accessible === false || !focusable) {
      return '-1';
    }
  } else if (role === 'button') {
    if (props.accessible !== false && focusable) {
      return '0';
    }
  } else {
    if (props.accessible === true && focusable) {
      return '0';
    }
  }
};

export default propsToTabIndex;
