/* eslint-env jasmine, jest */

import createDOMElement from '..';
import { shallow } from 'enzyme';

describe('modules/createDOMElement', () => {
  it('renders correct DOM element', () => {
    let element = shallow(createDOMElement('span'));
    expect(element.is('span')).toEqual(true);
    element = shallow(createDOMElement('main'));
    expect(element.is('main')).toEqual(true);
  });

  it('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const element = shallow(createDOMElement('span', { accessibilityLabel }));
    expect(element.prop('aria-label')).toEqual(accessibilityLabel);
  });

  it('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite';
    const element = shallow(createDOMElement('span', { accessibilityLiveRegion }));
    expect(element.prop('aria-live')).toEqual(accessibilityLiveRegion);
  });

  it('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner';
    let element = shallow(createDOMElement('span', { accessibilityRole }));
    expect(element.prop('role')).toEqual(accessibilityRole);
    expect(element.is('header')).toEqual(true);

    const button = 'button';
    element = shallow(createDOMElement('span', { accessibilityRole: 'button' }));
    expect(element.prop('type')).toEqual(button);
    expect(element.is('button')).toEqual(true);
  });

  it('prop "accessible"', () => {
    // accessible (implicit)
    let element = shallow(createDOMElement('span', {}));
    expect(element.prop('aria-hidden')).toEqual(null);
    // accessible (explicit)
    element = shallow(createDOMElement('span', { accessible: true }));
    expect(element.prop('aria-hidden')).toEqual(null);
    // not accessible
    element = shallow(createDOMElement('span', { accessible: false }));
    expect(element.prop('aria-hidden')).toEqual(true);
  });

  it('prop "testID"', () => {
    // no testID
    let element = shallow(createDOMElement('span', {}));
    expect(element.prop('data-testid')).toEqual(null);
    // with testID
    const testID = 'Example.testID';
    element = shallow(createDOMElement('span', { testID }));
    expect(element.prop('data-testid')).toEqual(testID);
  });
});
