/* eslint-env mocha */

import assert from 'assert'
import React from 'react'
import Text from '../'
import { mount, shallow } from 'enzyme'

suite('components/Text', () => {
  test('prop "children"', () => {
    const children = 'children'
    const text = shallow(<Text>{children}</Text>)
    assert.equal(text.prop('children'), children)
  })

  test('prop "numberOfLines"')

  test('prop "onLayout"', (done) => {
    mount(<Text onLayout={onLayout} />)
    function onLayout(e) {
      const { layout } = e.nativeEvent
      assert.deepEqual(layout, { x: 0, y: 0, width: 0, height: 0 })
      done()
    }
  })

  test('prop "onPress"', (done) => {
    const text = mount(<Text onPress={onPress} />)
    text.simulate('click')
    function onPress(e) {
      assert.ok(e.nativeEvent)
      done()
    }
  })

  test('prop "selectable"', () => {
    let text = shallow(<Text />)
    assert.equal(text.prop('style').userSelect, undefined)
    text = shallow(<Text selectable={false} />)
    assert.equal(text.prop('style').userSelect, 'none')
  })
})
