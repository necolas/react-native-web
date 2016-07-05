/* eslint-env mocha */

import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'
import View from '../'

suite('components/View', () => {
  test('prop "children"', () => {
    const children = 'children'
    const view = shallow(<View>{children}</View>)
    assert.equal(view.prop('children'), children)
  })

  test('prop "pointerEvents"', () => {
    const view = shallow(<View pointerEvents='box-only' />)
    assert.equal(view.prop('className'), '__style_pebo')
  })

  test('prop "style"', () => {
    const view = shallow(<View />)
    assert.equal(view.prop('style').flexShrink, 0)

    const flexView = shallow(<View style={{ flex: 1 }} />)
    assert.equal(flexView.prop('style').flexShrink, 1)

    const flexShrinkView = shallow(<View style={{ flexShrink: 1 }} />)
    assert.equal(flexShrinkView.prop('style').flexShrink, 1)

    const flexAndShrinkView = shallow(<View style={{ flex: 1, flexShrink: 2 }} />)
    assert.equal(flexAndShrinkView.prop('style').flexShrink, 2)
  })
})
