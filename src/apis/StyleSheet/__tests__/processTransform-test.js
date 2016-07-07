/* eslint-env mocha */

import assert from 'assert'
import processTransform from '../processTransform'

suite('apis/StyleSheet/processTransform', () => {
  test('transform', () => {
    const style = {
      transform: [
        { scaleX: 20 },
        { translateX: 20 },
        { rotate: '20deg' }
      ]
    }

    assert.deepEqual(
      processTransform(style),
      { transform: 'scaleX(20) translateX(20px) rotate(20deg)' }
    )
  })

  test('transformMatrix', () => {
    const style = {
      transformMatrix: [ 1, 2, 3, 4, 5, 6 ]
    }

    assert.deepEqual(
      processTransform(style),
      { transform: 'matrix3d(1,2,3,4,5,6)' }
    )
  })
})
