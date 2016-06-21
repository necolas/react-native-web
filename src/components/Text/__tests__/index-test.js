/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import Text from '../'

suite('components/Text', () => {
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
})
