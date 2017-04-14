/* eslint-env jasmine, jest */

import createDOMElement from '..';
import { render } from 'enzyme';

describe('modules/createDOMElement', () => {
  test('renders correct DOM element', () => {
    let component = render(createDOMElement('span'));
    expect(component).toMatchSnapshot();
    component = render(createDOMElement('main'));
    expect(component).toMatchSnapshot();
  });

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const component = render(createDOMElement('span', { accessibilityLabel }));
    expect(component).toMatchSnapshot();
  });

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'none';
    const component = render(createDOMElement('span', { accessibilityLiveRegion }));
    expect(component).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('roles', () => {
      const component = render(createDOMElement('span', { accessibilityRole: 'banner' }));
      expect(component).toMatchSnapshot();
    });

    test('button', () => {
      const component = render(createDOMElement('span', { accessibilityRole: 'button' }));
      expect(component).toMatchSnapshot();
    });

    test('headings', () => {
      let component = render(createDOMElement('div', { accessibilityRole: 'heading' }));
      expect(component).toMatchSnapshot();

      component = render(
        createDOMElement('div', { accessibilityRole: 'heading', 'aria-level': '3' })
      );
      expect(component).toMatchSnapshot();
    });

    test('link and target="_blank"', () => {
      const component = render(
        createDOMElement('span', {
          accessibilityRole: 'link',
          target: '_blank'
        })
      );
      expect(component).toMatchSnapshot();
    });

    describe('compatibility with', () => {
      test('accessibilityComponentType', () => {
        let component = render(createDOMElement('span', { accessibilityComponentType: 'button' }));
        expect(component).toMatchSnapshot();

        component = render(
          createDOMElement('span', {
            accessibilityComponentType: 'button',
            accessibilityRole: 'link'
          })
        );
        expect(component).toMatchSnapshot();
      });

      test('accessibilityTraits', () => {
        let component = render(createDOMElement('span', { accessibilityTraits: 'button' }));
        expect(component).toMatchSnapshot();

        component = render(
          createDOMElement('span', { accessibilityTraits: 'button', accessibilityRole: 'link' })
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  test('prop "accessible"', () => {
    // accessible (implicit)
    let component = render(createDOMElement('span', {}));
    expect(component).toMatchSnapshot();
    // accessible (explicit)
    component = render(createDOMElement('span', { accessible: true }));
    expect(component).toMatchSnapshot();
    // not accessible
    component = render(createDOMElement('span', { accessible: false }));
    expect(component).toMatchSnapshot();
  });

  test('prop "testID"', () => {
    const component = render(createDOMElement('span', { testID: 'Example.testID' }));
    expect(component).toMatchSnapshot();
  });
});
