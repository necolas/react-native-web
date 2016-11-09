/* eslint-env jasmine, jest */

import createDOMElement from '..';
import renderer from 'react-test-renderer';

describe('modules/createDOMElement', () => {
  test('renders correct DOM element', () => {
    let component = renderer.create(createDOMElement('span'));
    expect(component.toJSON()).toMatchSnapshot();
    component = renderer.create(createDOMElement('main'));
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const component = renderer.create(createDOMElement('span', { accessibilityLabel }));
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite';
    const component = renderer.create(createDOMElement('span', { accessibilityLiveRegion }));
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner';
    let component = renderer.create(createDOMElement('span', { accessibilityRole }));
    expect(component.toJSON()).toMatchSnapshot();
    component = renderer.create(createDOMElement('span', { accessibilityRole: 'button' }));
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessible"', () => {
    // accessible (implicit)
    let component = renderer.create(createDOMElement('span', {}));
    expect(component.toJSON()).toMatchSnapshot();
    // accessible (explicit)
    component = renderer.create(createDOMElement('span', { accessible: true }));
    expect(component.toJSON()).toMatchSnapshot();
    // not accessible
    component = renderer.create(createDOMElement('span', { accessible: false }));
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "testID"', () => {
    const component = renderer.create(createDOMElement('span', { testID: 'Example.testID' }));
    expect(component.toJSON()).toMatchSnapshot();
  });
});
