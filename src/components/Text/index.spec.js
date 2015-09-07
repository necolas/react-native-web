import assert from 'assert'
import React from 'react/addons'

import Text from '.'

const ReactTestUtils = React.addons.TestUtils

function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}

suite('Text', () => {
  test('defaults', () => {
    const result = ReactTestUtils.renderIntoDocument(<Text />)
    const root = React.findDOMNode(result)

    assert.equal((root.tagName).toLowerCase(), 'span')
  })

  test('prop "children"', () => {
    const children = 'children'
    const result = shallowRender(<Text>{children}</Text>)

    assert.equal(result.props.children, children)
  })

  test('prop "component"', () => {
    const type = 'a'
    const result = ReactTestUtils.renderIntoDocument(<Text component={type} />)
    const root = React.findDOMNode(result)

    assert.equal(
      (root.tagName).toLowerCase(),
      type,
      '"component" did not produce the correct DOM node type'
    )
  })

  test.skip('prop "numberOfLines"', () => {})

  test('prop "onPress"', (done) => {
    const result = ReactTestUtils.renderIntoDocument(<Text onPress={onPress} />)
    const root = React.findDOMNode(result)
    ReactTestUtils.Simulate.click(root)

    function onPress(e) {
      assert(true, 'the "onPress" callback was never called')
      assert.ok(e.nativeEvent)
      done()
    }
  })

  test('prop "style"', () => {
    const initial = shallowRender(<Text />)
    assert.deepEqual(
      initial.props.style,
      Text.defaultProps.style
    )

    const unsupported = shallowRender(<Text style={{ flexDirection: 'row' }} />)
    assert.deepEqual(
      unsupported.props.style.flexDirection,
      null,
      'unsupported "style" properties must not be transferred'
    )
  })

  test('prop "testID"', () => {
    const testID = 'Example.text'
    const result = ReactTestUtils.renderIntoDocument(<Text testID={testID} />)
    const root = React.findDOMNode(result)

    assert.equal(
      root.getAttribute('data-testid'),
      testID
    )
  })
})
