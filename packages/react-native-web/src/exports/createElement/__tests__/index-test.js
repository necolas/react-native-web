/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('exports/createElement', () => {
  test('renders different DOM elements', () => {
    let { container } = render(createElement('span'));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(createElement('main')));
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('string component type', () => {
      const { container } = render(createElement('span', { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('A');
    });

    test('function component type', () => {
      const Custom = () => <div />;
      const { container } = render(createElement(Custom, { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('DIV');
    });

    const testRole = ({ accessibilityRole, disabled }) => {
      [{ key: 'Enter' }, { key: ' ' }].forEach(({ key }) => {
        test(`"onClick" is ${disabled ? 'not ' : ''}called when "${key}" key is pressed`, () => {
          const onClick = jest.fn();
          const { container } = render(
            createElement('span', { accessibilityRole, disabled, onClick })
          );
          const event = document.createEvent('CustomEvent');
          event.initCustomEvent('keydown', true, true);
          event.key = key;
          container.firstChild.dispatchEvent(event);
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
