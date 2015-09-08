import { assertProps, renderToDOM, shallowRender } from '../../modules/specHelpers'
import assert from 'assert'
import React from 'react/addons'

import Text from '.'

const ReactTestUtils = React.addons.TestUtils

suite('Text', () => {
  test('prop "children"', () => {
    const children = 'children'
    const result = shallowRender(<Text>{children}</Text>)

    assert.equal(result.props.children, children)
  })

  test('prop "component"', () => {
    assertProps.component(Text, 'span')
  })

  test.skip('prop "numberOfLines"', () => {})

  test('prop "onPress"', (done) => {
    const dom = renderToDOM(<Text onPress={onPress} />)
    ReactTestUtils.Simulate.click(dom)

    function onPress(e) {
      assert(true, 'the "onPress" callback was never called')
      assert.ok(e.nativeEvent)
      done()
    }
  })

  test('prop "style"', () => {
    assertProps.style(Text)
  })

  test('prop "testID"', () => {
    assertProps.testID(Text)
  })
})
