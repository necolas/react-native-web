/* eslint-env jasmine, jest */

import createDOMElement from '..';
import { shallow, render } from 'enzyme';

describe('modules/createDOMElement', () => {
  test('it renders different DOM elements', () => {
    let component = render(createDOMElement('span'));
    expect(component).toMatchSnapshot();
    component = render(createDOMElement('main'));
    expect(component).toMatchSnapshot();
  });

  test('it normalizes event.nativeEvent', done => {
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

  describe('when ARIA role is "button"', () => {
    [{ disabled: true }, { disabled: false }].forEach(({ disabled }) => {
      describe(`and disabled is "${disabled}"`, () => {
        [{ name: 'Enter', which: 13 }, { name: 'Space', which: 32 }].forEach(({ name, which }) => {
          test(`"onClick" is ${disabled ? 'not ' : ''}called when "${name}" is pressed`, () => {
            const onClick = jest.fn();
            const component = shallow(
              createDOMElement('span', { accessibilityRole: 'button', disabled, onClick })
            );
            component.find('span').simulate('keyPress', {
              isDefaultPrevented() {},
              nativeEvent: {
                preventDefault() {},
                stopImmediatePropagation() {},
                stopPropagation() {}
              },
              preventDefault() {},
              which
            });
            expect(onClick).toHaveBeenCalledTimes(disabled ? 0 : 1);
          });
        });
      });
    });
  });
});
