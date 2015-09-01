import assert from 'assert';
import React from 'react/addons';

import { TextDefaultStyle } from './TextStylePropTypes';
import Text from '.';

const ReactTestUtils = React.addons.TestUtils;

function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer();
  shallowRenderer.render(component, context);
  return shallowRenderer.getRenderOutput();
}

suite('Text', () => {
  test('defaults', () => {
    const result = ReactTestUtils.renderIntoDocument(<Text />);
    const root = React.findDOMNode(result);

    assert.equal((root.tagName).toLowerCase(), 'span');
  });

  test('prop "children"', () => {
    const children = 'children';
    const result = shallowRender(<Text>{children}</Text>);

    assert.equal(result.props.children, children);
  });

  test('prop "className"', () => {
    const className = 'className';
    const result = shallowRender(<Text className={className} />);

    assert.ok(
      (result.props.className).indexOf(className) > -1,
      '"className" was not transferred'
    );
  });

  test('prop "component"', () => {
    const type = 'a';
    const result = ReactTestUtils.renderIntoDocument(<Text component={type} />);
    const root = React.findDOMNode(result);

    assert.equal(
      (root.tagName).toLowerCase(),
      type,
      '"component" did not produce the correct DOM node type'
    );
  });

  test('prop "style"', () => {
    const initial = shallowRender(<Text />);
    assert.deepEqual(
      initial.props.style,
      TextDefaultStyle,
      'default "style" is incorrect'
    );

    const unsupported = shallowRender(<Text style={{ unsupported: 'true' }} />);
    assert.deepEqual(
      unsupported.props.style.unsupported,
      null,
      'unsupported "style" properties must not be transferred'
    );
  });
});
