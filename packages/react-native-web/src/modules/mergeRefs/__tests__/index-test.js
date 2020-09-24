/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import mergeRefs from '..';
import { render } from '@testing-library/react';

describe('modules/mergeRefs', () => {
  test('merges refs of different types', () => {
    const ref = React.createRef(null);
    let functionRefValue = null;
    let hookRef;
    function Component() {
      const functionRef = x => {
        functionRefValue = x;
      };
      hookRef = React.useRef(null);
      return <div ref={mergeRefs(ref, hookRef, functionRef)} />;
    }

    render(<Component />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(hookRef.current).toBeInstanceOf(HTMLDivElement);
    expect(functionRefValue).toBeInstanceOf(HTMLDivElement);
  });
});
