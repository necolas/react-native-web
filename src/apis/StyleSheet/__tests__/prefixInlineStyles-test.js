/* eslint-env jasmine, jest */

import prefixInlineStyles from '../prefixInlineStyles';

describe('apis/StyleSheet/prefixInlineStyles', () => {
  test('handles array values', () => {
    const style = {
      display: ['-webkit-flex', 'flex']
    };

    expect(prefixInlineStyles(style)).toEqual({ display: 'flex' });
  });
});
