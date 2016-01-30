/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import flattenStyles from '../../../modules/StyleSheet/flattenStyles'
import React from 'react'

import View from '../'

suite('components/View', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const result = utils.shallowRender(<View accessibilityLabel={accessibilityLabel} />)
    assert.equal(result.props.accessibilityLabel, accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const result = utils.shallowRender(<View accessibilityLiveRegion={accessibilityLiveRegion} />)
    assert.equal(result.props.accessibilityLiveRegion, accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'accessibilityRole'
    const result = utils.shallowRender(<View accessibilityRole={accessibilityRole} />)
    assert.equal(result.props.accessibilityRole, accessibilityRole)
  })

  test('prop "accessible"', () => {
    const accessible = false
    const result = utils.shallowRender(<View accessible={accessible} />)
    assert.equal(result.props.accessible, accessible)
  })

  test('prop "children"', () => {
    const children = 'children'
    const result = utils.shallowRender(<View>{children}</View>)
    assert.equal(result.props.children, children)
  })

  test('prop "pointerEvents"', () => {
    const result = utils.shallowRender(<View pointerEvents='box-only' />)
    assert.equal(flattenStyles(result.props.style).pointerEvents, 'box-only')
  })

  test('prop "style"', () => {
    utils.assertProps.style(View)
  })

  test('prop "testID"', () => {
    const testID = 'testID'
    const result = utils.shallowRender(<View testID={testID} />)
    assert.equal(result.props.testID, testID)
  })
})
