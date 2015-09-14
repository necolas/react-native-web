import assert from 'assert'
import React from 'react/addons'

const ReactTestUtils = React.addons.TestUtils

export const assertProps = {
  accessibilityLabel: function (Component, props) {
    // with label
    const accessibilityLabel = 'accessibilityLabel'
    const dom = renderToDOM(<Component {...props} accessibilityLabel={accessibilityLabel} />)
    assert.equal(dom.getAttribute('aria-label'), accessibilityLabel)
  },

  accessibilityLiveRegion: function (Component, props) {
    const accessibilityLiveRegion = 'polite'
    const dom = renderToDOM(<Component {...props} accessibilityLiveRegion={accessibilityLiveRegion} />)
    assert.equal(dom.getAttribute('aria-live'), accessibilityLiveRegion)
  },

  accessibilityRole: function (Component, props) {
    const accessibilityRole = 'main'
    const dom = renderToDOM(<Component {...props} accessibilityRole={accessibilityRole} />)
    assert.equal(dom.getAttribute('role'), accessibilityRole)
  },

  accessible: function (Component, props) {
    // accessible
    let dom = renderToDOM(<Component {...props} accessible />)
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // not accessible
    dom = renderToDOM(<Component {...props} accessible={false} />)
    assert.equal(dom.getAttribute('aria-hidden'), 'true')
  },

  component: function (Component, props) {
    const component = 'main'
    const dom = renderToDOM(<Component {...props} component={component} />)
    const tagName = (dom.tagName).toLowerCase()
    assert.equal(tagName, component)
  },

  style: function (Component, props) {
    let shallow
    // default styles
    shallow = shallowRender(<Component {...props} />)
    assert.deepEqual(
      shallow.props.style,
      Component.defaultProps.style
    )
    // filtering of unsupported styles
    const styleToFilter = { unsupported: 'unsupported' }
    shallow = shallowRender(<Component {...props} style={styleToFilter} />)
    assert.deepEqual(
      shallow.props.style.unsupported,
      undefined,
      'unsupported "style" properties must not be transferred'
    )
    // merging of custom styles
    const styleToMerge = { margin: '10' }
    shallow = shallowRender(<Component {...props} style={styleToMerge} />)
    assert.deepEqual(
      shallow.props.style.margin,
      styleToMerge.margin,
    )
  },

  testID: function (Component, props) {
    // no testID
    let dom = renderToDOM(<Component {...props} />)
    assert.equal(dom.getAttribute('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    dom = renderToDOM(<Component {...props} testID={testID} />)
    assert.equal(dom.getAttribute('data-testid'), testID)
  }
}

export function render(element, container) {
  return container
    ? React.render(element, container)
    : ReactTestUtils.renderIntoDocument(element)
}

export function renderToDOM(element, container) {
  const result = render(element, container)
  return React.findDOMNode(result)
}

export function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}
