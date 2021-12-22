/* eslint-env jasmine, jest */

import React from 'react';
import renderRootContext from '../../../vendor/renderRootContext';
import ProgressBar from '..';

describe('components/ProgressBar', () => {
  describe('progress', () => {
    test('value as percentage is set to "aria-valuenow"', () => {
      const { container } = renderRootContext(<ProgressBar progress={0.5} />);
      expect(container.firstChild.getAttribute('aria-valuenow')).toBe('50');
    });

    test('is ignored when "indeterminate" is "true"', () => {
      const { container } = renderRootContext(<ProgressBar indeterminate progress={0.5} />);
      expect(container.firstChild.getAttribute('aria-valuenow')).toBe(null);
    });
  });
});
