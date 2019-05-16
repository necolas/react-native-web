/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render, shallow } from 'enzyme';

describe('modules/createElement', () => {
  test('renders different DOM elements', () => {
    let component = render(createElement('span'));
    expect(component).toMatchSnapshot();
    component = render(createElement('main'));
    expect(component).toMatchSnapshot();
  });

  test('normalizes event.nativeEvent', done => {
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

  test('gracefully handles onClick for links', () => {
    let wasCalled = false;
    const component = shallow(
      createElement('div', {
        accessibilityRole: 'link',
        onClick: () => {
          wasCalled = true;
        }
      })
    );
    component.find('a').simulate('click', {
      isDefaultPrevented() {},
      nativeEvent: {},
      preventDefault() {}
    });

    expect(wasCalled).toBe(true);
  });

  test('gracefully handles onClick for touchable links', () => {
    let wasCalled = false;
    const component = shallow(
      createElement('div', {
        accessibilityRole: 'link',
        onResponderRelease: () => {}, // fake touchable
        onClick: () => {
          wasCalled = true;
        }
      })
    );
    component.find('a').simulate('click', {
      isDefaultPrevented() {},
      nativeEvent: {},
      preventDefault() {}
    });

    expect(wasCalled).toBe(true);
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

    const testRole = ({ accessibilityRole, disabled }) => {
      [{ key: 'Enter', which: 13 }, { key: 'Space', which: 32 }].forEach(({ key, which }) => {
        test(`"onClick" is ${disabled ? 'not ' : ''}called when "${key}" key is pressed`, () => {
          const onClick = jest.fn();
          const component = shallow(
            createElement('span', { accessibilityRole, disabled, onClick })
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
    };

    describe('value is "button" and disabled is "true"', () => {
      testRole({ accessibilityRole: 'button', disabled: true });
    });

    describe('value is "button" and disabled is "false"', () => {
      testRole({ accessibilityRole: 'button', disabled: false });
    });

    describe('value is "menuitem" and disabled is "true"', () => {
      testRole({ accessibilityRole: 'menuitem', disabled: true });
    });

    describe('value is "menuitem" and disabled is "false"', () => {
      testRole({ accessibilityRole: 'menuitem', disabled: false });
    });
  });
});
