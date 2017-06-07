/* eslint-env jasmine, jest */

import createDOMElement from '..';
import { shallow, render } from 'enzyme';

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
    const component = render(createDOMElement('span', { accessibilityLiveRegion: 'none' }));
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
    let component = render(createDOMElement('span', { accessible: true }));
    expect(component).toMatchSnapshot();

    component = render(createDOMElement('span', { accessible: false }));
    expect(component).toMatchSnapshot();
  });

  test('prop "importantForAccessibility"', () => {
    let component = render(createDOMElement('span', { importantForAccessibility: 'auto' }));
    expect(component).toMatchSnapshot();

    component = render(createDOMElement('span', { importantForAccessibility: 'no' }));
    expect(component).toMatchSnapshot();

    component = render(
      createDOMElement('span', { importantForAccessibility: 'no-hide-descendants' })
    );
    expect(component).toMatchSnapshot();

    component = render(createDOMElement('span', { importantForAccessibility: 'yes' }));
    expect(component).toMatchSnapshot();
  });

  test('onClick', done => {
    const onClick = e => {
      e.nativeEvent.timestamp = 1496876171255;
      expect(e.nativeEvent).toMatchSnapshot();
      done();
    };
    const component = shallow(createDOMElement('span', { onClick }));
    component.find('span').simulate('click', {
      nativeEvent: {
        preventDefault() {},
        stopImmediatePropagation() {},
        stopPropagation() {}
      }
    });
  });

  test('prop "testID"', () => {
    const component = render(createDOMElement('span', { testID: 'Example.testID' }));
    expect(component).toMatchSnapshot();
  });
});
