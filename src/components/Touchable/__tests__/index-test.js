/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'

import Touchable from '../'

const children = <span style={{}}>children</span>
const requiredProps = { children }

suite('components/Touchable', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const result = utils.shallowRender(<Touchable {...requiredProps} accessibilityLabel={accessibilityLabel} />)
    assert.equal(result.props.accessibilityLabel, accessibilityLabel)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'accessibilityRole'
    const result = utils.shallowRender(<Touchable {...requiredProps} accessibilityRole={accessibilityRole} />)
    assert.equal(result.props.accessibilityRole, accessibilityRole)
  })

  test('prop "accessible"', () => {
    const accessible = false
    const result = utils.shallowRender(<Touchable {...requiredProps} accessible={accessible} />)
    assert.equal(result.props.accessible, accessible)
  })

  test('prop "children"', () => {
    const result = utils.shallowRender(<Touchable {...requiredProps} />)
    assert.deepEqual(result.props.children, children)
  })
})
