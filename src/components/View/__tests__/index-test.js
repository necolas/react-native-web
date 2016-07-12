/* eslint-env mocha */

import assert from 'assert'
import includes from 'lodash/includes'
import React from 'react'
import View from '../'
import { mount, shallow } from 'enzyme'

suite('components/View', () => {
  suite('rendered element', () => {
    test('is a "div" by default', () => {
      const view = shallow(<View />)
      assert.equal(view.is('div'), true)
    })

    test('is a "span" when inside <View accessibilityRole="button" />', () => {
      const view = mount(<View accessibilityRole='button'><View /></View>)
      assert.equal(view.find('span').length, 1)
    })
  })

  test('prop "children"', () => {
    const children = <View testID='1' />
    const view = shallow(<View>{children}</View>)
    assert.equal(view.prop('children'), children)
  })

  test('prop "onLayout"', (done) => {
    mount(<View onLayout={onLayout} />)
    function onLayout(e) {
      const { layout } = e.nativeEvent
      assert.deepEqual(layout, { x: 0, y: 0, width: 0, height: 0 })
      done()
    }
  })

  test('prop "pointerEvents"', () => {
    const view = shallow(<View pointerEvents='box-only' />)
    assert.ok(includes(view.prop('className'), '__style_pebo') === true)
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
