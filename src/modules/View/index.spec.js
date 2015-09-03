import assert from 'assert'
import React from 'react/addons'

import { ViewDefaultStyle } from './ViewStylePropTypes'
import View from '.'

const ReactTestUtils = React.addons.TestUtils

function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}

suite('View', () => {
  test('defaults', () => {
    const result = ReactTestUtils.renderIntoDocument(<View />)
    const root = React.findDOMNode(result)

    assert.equal((root.tagName).toLowerCase(), 'div')
  })

  test('prop "children"', () => {
    const children = 'children'
    const result = shallowRender(<View>{children}</View>)

    assert.equal(result.props.children, children)
  })

  test('prop "className"', () => {
    const className = 'className'
    const result = shallowRender(<View className={className} />)

    assert.ok(
      (result.props.className).indexOf(className) > -1,
      '"className" was not transferred'
    )
  })

  test('prop "component"', () => {
    const type = 'a'
    const result = ReactTestUtils.renderIntoDocument(<View component={type} />)
    const root = React.findDOMNode(result)

    assert.equal(
      (root.tagName).toLowerCase(),
      type,
      '"component" did not produce the correct DOM node type'
    )
  })

  test('prop "pointerEvents"', () => {
    const result = shallowRender(<View pointerEvents='box-only' />)

    assert.equal(
      result.props.style.pointerEvents,
      'box-only'
    )
  })

  test('prop "style"', () => {
    const initial = shallowRender(<View />)
    assert.deepEqual(
      initial.props.style,
      ViewDefaultStyle,
      'default "style" is incorrect'
    )

    const unsupported = shallowRender(<View style={{ unsupported: 'true' }} />)
    assert.deepEqual(
      unsupported.props.style.unsupported,
      null,
      'unsupported "style" properties must not be transferred'
    )
  })
})
