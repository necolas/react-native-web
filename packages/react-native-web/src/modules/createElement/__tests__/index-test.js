/* eslint-env jasmine, jest */

import createElement from '..';
import { shallow, render } from 'enzyme';

describe('modules/createElement', () => {
  test('it renders different DOM elements', () => {
    let component = render(createElement('span'));
    expect(component).toMatchSnapshot();
    component = render(createElement('main'));
    expect(component).toMatchSnapshot();
  });

  test('it normalizes event.nativeEvent', done => {
    const onClick = e => {
      e.nativeEvent.timestamp = 1496876171255;
      expect(e.nativeEvent).toMatchSnapshot();
      done();
    };
    const component = shallow(createElement('span', { onClick }));
    component.find('span').simulate('click', {
      nativeEvent: {}
    });
  });

  describe('when ARIA role is "button"', () => {
    [{ disabled: true }, { disabled: false }].forEach(({ disabled }) => {
      describe(`and disabled is "${disabled}"`, () => {
        [{ name: 'Enter', which: 13 }, { name: 'Space', which: 32 }].forEach(({ name, which }) => {
          test(`"onClick" is ${disabled ? 'not ' : ''}called when "${name}" is pressed`, () => {
            const onClick = jest.fn();
            const component = shallow(
              createElement('span', { accessibilityRole: 'button', disabled, onClick })
            );
            component.find('span').simulate('keyPress', {
              isDefaultPrevented() {},
              nativeEvent: {},
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
