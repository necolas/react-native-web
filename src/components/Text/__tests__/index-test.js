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

  test('prop "onPress"', (done) => {
    const text = mount(<Text onPress={onPress} />)
    text.simulate('click')
    function onPress(e) {
      assert.ok(e.nativeEvent)
      done()
    }
  })
})
