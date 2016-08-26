/* eslint-env mocha */

import assert from 'assert';
import processTextShadow from '../processTextShadow';

suite('apis/StyleSheet/processTextShadow', () => {
  test('textShadowOffset', () => {
    const style = {
      textShadowColor: 'red',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5
    };

    assert.deepEqual(
      processTextShadow(style),
      {
        textShadow: '2px 2px 5px red',
        textShadowColor: null,
        textShadowOffset: null,
        textShadowRadius: null
      }
    );
  });
});
