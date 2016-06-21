/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'

import View from '../'

suite('components/View', () => {
  test('prop "children"', () => {
    const children = 'children'
    const result = utils.shallowRender(<View>{children}</View>)
    assert.equal(result.props.children, children)
  })

  test('prop "pointerEvents"', () => {
    const result = utils.shallowRender(<View pointerEvents='box-only' />)
    assert.equal(result.props.className, '__style_pebo')
  })

  test('prop "style"', () => {
    const noFlex = utils.shallowRender(<View />)
    assert.equal(noFlex.props.style.flexShrink, 0)

    const flex = utils.shallowRender(<View style={{ flex: 1 }} />)
    assert.equal(flex.props.style.flexShrink, 1)

    const flexShrink = utils.shallowRender(<View style={{ flexShrink: 1 }} />)
    assert.equal(flexShrink.props.style.flexShrink, 1)

    const flexAndShrink = utils.shallowRender(<View style={{ flex: 1, flexShrink: 2 }} />)
    assert.equal(flexAndShrink.props.style.flexShrink, 2)
  })
})
