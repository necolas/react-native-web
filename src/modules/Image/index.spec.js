import assert from 'assert'
import React from 'react/addons'

import { ImageDefaultStyle } from './ImageStylePropTypes'
import Image from '.'

const ReactTestUtils = React.addons.TestUtils

function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}

suite('Image', () => {
  test('defaults', () => {
    const result = ReactTestUtils.renderIntoDocument(<Image />)
    const root = React.findDOMNode(result)

    assert.equal((root.tagName).toLowerCase(), 'img')
  })

  test('prop "accessibilityLabel"', () => {
    const label = 'accessibilityLabel'
    const result = ReactTestUtils.renderIntoDocument(<Image accessibilityLabel={label} />)
    const root = React.findDOMNode(result)

    assert.equal(root.getAttribute('alt'), label)
  })

  test('prop "className"', () => {
    const className = 'className'
    const result = shallowRender(<Image className={className} />)

    assert.ok(
      (result.props.className).indexOf(className) > -1,
      '"className" was not transferred'
    )
  })

  test('prop "source"', () => {
    const source = 'path-to-image'
    const result = ReactTestUtils.renderIntoDocument(<Image source={source} />)
    const root = React.findDOMNode(result)

    assert.equal(root.getAttribute('src'), source)
  })

  test('prop "style"', () => {
    const initial = shallowRender(<Image />)
    assert.deepEqual(
      initial.props.style,
      ImageDefaultStyle,
      'default "style" is incorrect'
    )

    const unsupported = shallowRender(<Image style={{ unsupported: 'true' }} />)
    assert.deepEqual(
      unsupported.props.style.unsupported,
      null,
      'unsupported "style" properties must not be transferred'
    )
  })
})
