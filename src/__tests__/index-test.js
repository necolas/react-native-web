/* eslint-env mocha */

import * as utils from '../modules/specHelpers'
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

  suite('render methods', () => {
    const id = 'test'
    let div

    setup(() => {
      div = document.createElement('div')
      div.id = id
      document.body.appendChild(div)
    })

    teardown(() => {
      document.body.removeChild(div)
    })

    test('"render" creates style sheet', () => {
      React.render(<div />, div)
      assert.ok(document.getElementById('react-stylesheet'))
    })

    test('"renderToString" creates style sheet', () => {
      const result = React.renderToString(<div />)
      assert.ok(result.indexOf('react-stylesheet') > -1)
    })

    test('"renderToStaticMarkup" creates style sheet', () => {
      const result = React.renderToStaticMarkup(<div />)
      assert.ok(result.indexOf('react-stylesheet') > -1)
    })
  })
})
