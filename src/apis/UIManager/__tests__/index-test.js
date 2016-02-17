/* eslint-env mocha */

import assert from 'assert'
import UIManager from '..'

const createNode = (style = {}) => {
  const root = document.createElement('div')
  Object.keys(style).forEach((prop) => {
    root.style[prop] = style[prop]
  })
  return root
}

let defaultBodyMargin

suite('apis/UIManager', () => {
  setup(() => {
    // remove default body margin so we can predict the measured offsets
    defaultBodyMargin = document.body.style.margin
    document.body.style.margin = 0
  })

  teardown(() => {
    document.body.style.margin = defaultBodyMargin
  })

  suite('measure', () => {
    test('provides correct layout to callback', () => {
      const node = createNode({ height: '5000px', left: '100px', position: 'relative', top: '100px', width: '5000px' })
      document.body.appendChild(node)

      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        assert.equal(x, 100)
        assert.equal(y, 100)
        assert.equal(width, 5000)
        assert.equal(height, 5000)
        assert.equal(pageX, 100)
        assert.equal(pageY, 100)
      })

      // test values account for scroll position
      window.scrollTo(200, 200)
      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        assert.equal(x, 100)
        assert.equal(y, 100)
        assert.equal(width, 5000)
        assert.equal(height, 5000)
        assert.equal(pageX, -100)
        assert.equal(pageY, -100)
      })

      document.body.removeChild(node)
    })
  })

  suite('measureLayout', () => {
    test('provides correct layout to onSuccess callback', () => {
      const node = createNode({ height: '10px', width: '10px' })
      const middle = createNode({ padding: '20px' })
      const context = createNode({ padding: '20px' })
      middle.appendChild(node)
      context.appendChild(middle)
      document.body.appendChild(context)

      UIManager.measureLayout(node, context, () => {}, (x, y, width, height) => {
        assert.equal(x, 40)
        assert.equal(y, 40)
        assert.equal(width, 10)
        assert.equal(height, 10)
      })

      document.body.removeChild(context)
    })
  })

  suite('updateView', () => {
    test('adds new className to existing className', () => {
      const node = createNode()
      node.className = 'existing'
      const props = { className: 'extra' }
      UIManager.updateView(node, props)
      assert.equal(node.getAttribute('class'), 'existing extra')
    })

    test('adds new style to existing style', () => {
      const node = createNode({ color: 'red' })
      const props = { style: { opacity: 0 } }
      UIManager.updateView(node, props)
      assert.equal(node.getAttribute('style'), 'color: red; opacity: 0;')
    })

    test('sets attribute values', () => {
      const node = createNode()
      const props = { 'aria-level': '4', 'data-of-type': 'string' }
      UIManager.updateView(node, props)
      assert.equal(node.getAttribute('aria-level'), '4')
      assert.equal(node.getAttribute('data-of-type'), 'string')
    })
  })
})
