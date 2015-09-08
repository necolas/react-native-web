import assert from 'assert'
import React from 'react/addons'

const ReactTestUtils = React.addons.TestUtils

export const assertProps = {
  accessibilityLabel: function (Component) {
    // no label
    let dom = renderToDOM(<Component />)
    assert.equal(dom.getAttribute('aria-label'), null)
    // with label
    const accessibilityLabel = 'accessibilityLabel'
    dom = renderToDOM(<Component accessibilityLabel={accessibilityLabel} />)
    assert.equal(dom.getAttribute('aria-label'), accessibilityLabel)
  },

  accessibilityLiveRegion: function (Component) {
    // no live
    let dom = renderToDOM(<Component />)
    assert.equal(dom.getAttribute('aria-live'), null)
    // with live
    const accessibilityLiveRegion = 'polite'
    dom = renderToDOM(<Component accessibilityLiveRegion={accessibilityLiveRegion} />)
    assert.equal(dom.getAttribute('aria-live'), accessibilityLiveRegion)
  },

  accessibilityRole: function (Component) {
    // no role
    let dom = renderToDOM(<Component />)
    assert.equal(dom.getAttribute('role'), null)
    // with role
    const accessibilityRole = 'main'
    dom = renderToDOM(<Component accessibilityRole={accessibilityRole} />)
    assert.equal(dom.getAttribute('role'), accessibilityRole)
  },

  accessible: function (Component) {
    // accessible
    let dom = renderToDOM(<Component accessible={true} />)
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // not accessible
    dom = renderToDOM(<Component accessible={false} />)
    assert.equal(dom.getAttribute('aria-hidden'), 'true')
  },

  component: function (Component, defaultType) {
    let dom, tagName
    const type = 'a'
    // no type (check default)
    dom = renderToDOM(<Component />)
    tagName = (dom.tagName).toLowerCase()
    assert.equal(tagName, defaultType)
    // with type
    dom = renderToDOM(<Component component={type} />)
    tagName = (dom.tagName).toLowerCase()
    assert.equal(tagName, type)
  },

  style: function (Component) {
    let shallow
    // default styles
    shallow = shallowRender(<Component />)
    assert.deepEqual(
      shallow.props.style,
      Component.defaultProps.style
    )
    // filtering of unsupported styles
    const styleToFilter = { unsupported: 'unsupported' }
    shallow = shallowRender(<Component style={styleToFilter} />)
    assert.deepEqual(
      shallow.props.style.unsupported,
      null,
      'unsupported "style" properties must not be transferred'
    )
    // merging of custom styles
    const styleToMerge = { margin: '10' }
    shallow = shallowRender(<Component style={styleToMerge} />)
    assert.deepEqual(
      shallow.props.style.margin,
      styleToMerge.margin,
    )
  },

  testID: function (Component) {
    // no testID
    let dom = renderToDOM(<Component />)
    assert.equal(dom.getAttribute('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    dom = renderToDOM(<Component testID={testID} />)
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
