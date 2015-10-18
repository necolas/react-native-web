/* eslint-env mocha */

import { assertProps, shallowRender } from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react/addons'

import Touchable from '../'

const children = <span style={{}}>children</span>
const requiredProps = { children }

suite('components/Touchable', () => {
  test('prop "accessibilityLabel"', () => {
    assertProps.accessibilityLabel(Touchable, requiredProps)
  })

  test('prop "accessibilityRole"', () => {
    assertProps.accessibilityRole(Touchable, requiredProps)
  })

  test('prop "accessible"', () => {
    assertProps.accessible(Touchable, requiredProps)
  })

  test('prop "children"', () => {
    const result = shallowRender(<Touchable {...requiredProps} />)
    assert.deepEqual(result.props.children, children)
  })
})
