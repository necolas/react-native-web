/* eslint-env mocha */

import assert from 'assert'
import processVendorPrefixes from '../processVendorPrefixes'

suite('apis/StyleSheet/processVendorPrefixes', () => {
  test('handles array values', () => {
    const style = {
      display: [ '-webkit-flex', 'flex' ]
    }

    assert.deepEqual(
      processVendorPrefixes(style),
      { display: 'flex' }
    )
  })
})
