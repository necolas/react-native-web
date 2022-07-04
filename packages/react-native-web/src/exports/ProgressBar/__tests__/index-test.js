/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '..';

describe('components/ProgressBar', () => {
  describe('progress', () => {
    test('value as percentage is set to "aria-valuenow"', () => {
      const { container } = render(<ProgressBar progress={0.5} />);
      expect(container.firstChild.getAttribute('aria-valuenow')).toBe('50');
    });

    test('is ignored when "indeterminate" is "true"', () => {
      const { container } = render(
        <ProgressBar indeterminate progress={0.5} />
      );
      expect(container.firstChild.getAttribute('aria-valuenow')).toBe(null);
    });
  });
});
