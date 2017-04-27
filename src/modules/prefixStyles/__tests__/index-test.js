/* eslint-env jasmine, jest */

import { prefixInlineStyles } from '..';

describe('modules/prefixStyles', () => {
  test('handles array values for inline styles', () => {
    const style = {
      display: ['-webkit-flex', 'flex']
    };

    expect(prefixInlineStyles(style)).toEqual({ display: 'flex' });
  });
});
