import { assertProps, shallowRender } from '../../modules/specHelpers'
import assert from 'assert'
import React from 'react/addons'

import View from '.'

suite('View', () => {
  test('prop "accessibilityLabel"', () => {
    assertProps.accessibilityLabel(View)
  })

  test('prop "accessibilityLiveRegion"', () => {
    assertProps.accessibilityLiveRegion(View)
  })

  test('prop "accessibilityRole"', () => {
    assertProps.accessibilityRole(View)
  })

  test('prop "accessible"', () => {
    assertProps.accessible(View)
  })

  test('prop "children"', () => {
    const children = 'children'
    const result = shallowRender(<View>{children}</View>)
    assert.equal(result.props.children, children)
  })

  test('prop "component"', () => {
    assertProps.component(View, 'div')
  })

  test('prop "pointerEvents"', () => {
    const result = shallowRender(<View pointerEvents='box-only' />)
    assert.equal(result.props.style.pointerEvents, 'box-only')
  })

  test('prop "style"', () => {
    assertProps.style(View)
  })

  test('prop "testID"', () => {
    assertProps.testID(View)
  })
})
