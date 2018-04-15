/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render, shallow } from 'enzyme';

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

  describe('prop "accessibilityRole"', () => {
    test('and string component type', () => {
      const component = shallow(createElement('span', { accessibilityRole: 'link' }));
      expect(component.find('a').length).toBe(1);
    });

    test('and function component type', () => {
      const Custom = () => <div />;
      const component = shallow(createElement(Custom, { accessibilityRole: 'link' }));
      expect(component.find('div').length).toBe(1);
    });

    [{ disabled: true }, { disabled: false }].forEach(({ disabled }) => {
      describe(`value is "button" and disabled is "${disabled}"`, () => {
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
