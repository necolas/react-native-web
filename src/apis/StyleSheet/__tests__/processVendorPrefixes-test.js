/* eslint-env jasmine, jest */

import processVendorPrefixes from '../processVendorPrefixes';

describe('apis/StyleSheet/processVendorPrefixes', () => {
  test('handles array values', () => {
    const style = {
      display: [ '-webkit-flex', 'flex' ]
    };

    expect(processVendorPrefixes(style)).toEqual({ display: 'flex' });
  });
});
