/* eslint-env mocha */

import assert from 'assert'
import React from '..'

suite('ReactNativeWeb', () => {
  suite('exports', () => {
    test('React', () => {
      assert.ok(React)
    })

    test('ReactDOM methods', () => {
      assert.ok(React.findDOMNode)
      assert.ok(React.render)
      assert.ok(React.unmountComponentAtNode)
    })

    test('ReactDOM/server methods', () => {
      assert.ok(React.renderToString)
      assert.ok(React.renderToStaticMarkup)
    })
  })
})
