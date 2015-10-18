/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import Text from '../'

suite('components/Text', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const result = utils.shallowRender(<Text accessibilityLabel={accessibilityLabel} />)
    assert.equal(result.props.accessibilityLabel, accessibilityLabel)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'accessibilityRole'
    const result = utils.shallowRender(<Text accessibilityRole={accessibilityRole} />)
    assert.equal(result.props.accessibilityRole, accessibilityRole)
  })

  test('prop "accessible"', () => {
    const accessible = false
    const result = utils.shallowRender(<Text accessible={accessible} />)
    assert.equal(result.props.accessible, accessible)
  })

  test('prop "children"', () => {
    const children = 'children'
    const result = utils.shallowRender(<Text>{children}</Text>)
    assert.equal(result.props.children, children)
  })

  test('prop "numberOfLines"')

  test('prop "onPress"', (done) => {
    const dom = utils.renderToDOM(<Text onPress={onPress} />)
    ReactTestUtils.Simulate.click(dom)
    function onPress(e) {
      assert.ok(e.nativeEvent)
      done()
    }
  })

  test('prop "style"', () => {
    utils.assertProps.style(Text)
  })

  test('prop "testID"', () => {
    const testID = 'testID'
    const result = utils.shallowRender(<Text testID={testID} />)
    assert.equal(result.props.testID, testID)
  })
})
