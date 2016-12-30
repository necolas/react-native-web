/* eslint-env jasmine, jest */

import resolveVendorPrefixes from '../resolveVendorPrefixes';

describe('apis/StyleSheet/resolveVendorPrefixes', () => {
  test('handles array values', () => {
    const style = {
      display: [ '-webkit-flex', 'flex' ]
    };

    expect(resolveVendorPrefixes(style)).toEqual({ display: 'flex' });
  });
});
