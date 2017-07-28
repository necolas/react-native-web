/* eslint-env jasmine, jest */

import createDOMProps from '..';

const createProps = props => createDOMProps(null, props);

describe('modules/createDOMProps', () => {
  test('prop "accessibilityLabel" becomes "aria-label"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const props = createProps({ accessibilityLabel });
    expect(props['aria-label']).toEqual(accessibilityLabel);
  });

  test('prop "accessibilityLiveRegion" becomes "aria-live"', () => {
    const accessibilityLiveRegion = 'none';
    const props = createProps({ accessibilityLiveRegion });
    expect(props['aria-live']).toEqual('off');
  });

  describe('prop "accessibilityRole"', () => {
    test('does not become "role" when value is "label"', () => {
      const accessibilityRole = 'label';
      const props = createProps({ accessibilityRole });
      expect(props.role).toBeUndefined();
    });
  });

  test('prop "className" is preserved', () => {
    const className = 'external-class-name';
    const props = createProps({ className });
    expect(props.className).toEqual(className);
  });

  test('prop "importantForAccessibility" becomes "aria-hidden"', () => {
    const props = createProps({ importantForAccessibility: 'no-hide-descendants' });
    expect(props['aria-hidden']).toEqual(true);
  });

  test('prop "testID" becomes "data-testid"', () => {
    const testID = 'Example.testID';
    const props = createProps({ testID });
    expect(props['data-testid']).toEqual(testID);
  });

  test('includes reset styles for "a" elements', () => {
    const props = createDOMProps('a');
    expect(props).toMatchSnapshot();
  });

  test('includes "rel" values for "a" elements (to securely open external links)', () => {
    const props = createDOMProps('a', { target: '_blank' });
    expect(props.rel).toMatchSnapshot();
  });

  test('includes reset styles for "button" elements', () => {
    const props = createDOMProps('button');
    expect(props).toMatchSnapshot();
  });

  test('includes cursor style for "button" role', () => {
    const props = createDOMProps('span', { accessibilityRole: 'button' });
    expect(props).toMatchSnapshot();
  });

  test('includes reset styles for "ul" elements', () => {
    const props = createDOMProps('ul');
    expect(props).toMatchSnapshot();
  });

  test('includes tabIndex when needed', () => {
    const props = createProps({ accessible: true });
    expect(props.tabIndex).toBeDefined();
  });
});
