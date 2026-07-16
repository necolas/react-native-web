/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import InputAccessoryView from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('components/InputAccessoryView', () => {
  test('is exported and renders its children', () => {
    const { container } = render(
      <InputAccessoryView nativeID="accessory">
        <div>child</div>
      </InputAccessoryView>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.textContent).toBe('child');
  });
});
