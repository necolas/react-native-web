/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createElement from '..';
import React from 'react';
import { render } from '@testing-library/react';

function getAttribute(container, attribute) {
  return container.firstChild.getAttribute(attribute);
}

function getProperty(container, prop) {
  return container.firstChild[prop];
}

describe('exports/createElement', () => {
  test('renders different DOM elements', () => {
    let { container } = render(createElement('span'));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(createElement('main')));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(
      createElement('svg', {
        children: createElement('image', { href: '#href' })
      })
    ));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders variadic children', () => {
    let { container } = render(
      createElement('div', null, undefined, createElement('span'), 'text')
    );
    expect(container.firstChild.innerHTML).toBe('<span></span>text');
    ({ container } = render(
      createElement('div', { children: 'prop' }, undefined, 'arg')
    ));
    expect(container.firstChild.innerHTML).toBe('arg');
  });

  describe('prop "role"', () => {
    test('string component type', () => {
      const { container } = render(createElement('span', { role: 'link' }));
      expect(container.firstChild.nodeName).toBe('SPAN');
    });

    test('function component type', () => {
      const Custom = () => <div />;
      const { container } = render(createElement(Custom, { role: 'link' }));
      expect(container.firstChild.nodeName).toBe('DIV');
    });
  });

  describe('accessibility props', () => {
    test('aria-activedescendant', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-activedescendant': null })
      );
      expect(getAttribute(isEmpty, 'aria-activedescendant')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-activedescendant': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-activedescendant')).toBe('abc');
    });

    test('aria-atomic', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-atomic': null })
      );
      expect(getAttribute(isEmpty, 'aria-atomic')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-atomic': true })
      );
      expect(getAttribute(hasValue, 'aria-atomic')).toBe('true');
    });

    test('aria-autocomplete', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-autocomplete': null })
      );
      expect(getAttribute(isEmpty, 'aria-autocomplete')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-autocomplete': true })
      );
      expect(getAttribute(hasValue, 'aria-autocomplete')).toBe('true');
    });

    test('aria-busy', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-busy': null })
      );
      expect(getAttribute(isEmpty, 'aria-busy')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-busy': true })
      );
      expect(getAttribute(hasValue, 'aria-busy')).toBe('true');
    });

    test('aria-checked', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-checked': null })
      );
      expect(getAttribute(isEmpty, 'aria-checked')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-checked': true })
      );
      expect(getAttribute(hasValue, 'aria-checked')).toBe('true');
    });

    test('aria-colcount', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-colcount': null })
      );
      expect(getAttribute(isEmpty, 'aria-colcount')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-colcount': 5 })
      );
      expect(getAttribute(hasValue, 'aria-colcount')).toBe('5');
    });

    test('aria-colindex', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-colindex': null })
      );
      expect(getAttribute(isEmpty, 'aria-colindex')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-colindex': 5 })
      );
      expect(getAttribute(hasValue, 'aria-colindex')).toBe('5');
    });

    test('aria-colspan', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-colspan': null })
      );
      expect(getAttribute(isEmpty, 'aria-colspan')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-colspan': 5 })
      );
      expect(getAttribute(hasValue, 'aria-colspan')).toBe('5');
    });

    test('aria-controls', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-controls': null })
      );
      expect(getAttribute(isEmpty, 'aria-controls')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-controls': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-controls')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { 'aria-controls': ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-controls')).toBe('abc def');
    });

    test('aria-current', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-current': null })
      );
      expect(getAttribute(isEmpty, 'aria-current')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-current': 'page' })
      );
      expect(getAttribute(hasValue, 'aria-current')).toBe('page');
    });

    test('aria-describedby', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-describedby': null })
      );
      expect(getAttribute(isEmpty, 'aria-describedby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-describedby': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-describedby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { 'aria-describedby': ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-describedby')).toBe(
        'abc def'
      );
    });

    test('aria-details', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-details': null })
      );
      expect(getAttribute(isEmpty, 'aria-details')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-details': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-details')).toBe('abc');
    });

    test('aria-disabled', () => {
      const { container: isEmpty } = render(
        createElement('button', { 'aria-disabled': null })
      );
      expect(getAttribute(isEmpty, 'aria-disabled')).toBeNull();
      expect(getProperty(isEmpty, 'disabled')).toBe(false);
      const { container: hasValue } = render(
        createElement('button', { 'aria-disabled': true })
      );
      expect(getAttribute(hasValue, 'aria-disabled')).toBe('true');
      expect(getProperty(hasValue, 'disabled')).toBe(true);
    });

    test('aria-errormessage', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-errormessage': null })
      );
      expect(getAttribute(isEmpty, 'aria-errormessage')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-errormessage': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-errormessage')).toBe('abc');
    });

    test('aria-expanded', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-expanded': null })
      );
      expect(getAttribute(isEmpty, 'aria-expanded')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-expanded': true })
      );
      expect(getAttribute(hasValue, 'aria-expanded')).toBe('true');
    });

    test('aria-flowto', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-flowto': null })
      );
      expect(getAttribute(isEmpty, 'aria-flowto')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-flowto': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-flowto')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { 'aria-flowto': ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-flowto')).toBe('abc def');
    });

    test('aria-haspopup', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-haspopup': null })
      );
      expect(getAttribute(isEmpty, 'aria-haspopup')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-haspopup': true })
      );
      expect(getAttribute(hasValue, 'aria-haspopup')).toBe('true');
    });

    test('aria-hidden', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-hidden': null })
      );
      expect(getAttribute(isEmpty, 'aria-hidden')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-hidden': true })
      );
      expect(getAttribute(hasValue, 'aria-hidden')).toBe('true');
    });

    test('aria-invalid', () => {
      const { container: isEmpty } = render(
        createElement('input', { 'aria-invalid': null })
      );
      expect(getAttribute(isEmpty, 'aria-invalid')).toBeNull();
      const { container: hasValue } = render(
        createElement('input', { 'aria-invalid': true })
      );
      expect(getAttribute(hasValue, 'aria-invalid')).toBe('true');
    });

    test('aria-keyshortcuts', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-keyshortcuts': null })
      );
      expect(getAttribute(isEmpty, 'aria-keyshortcuts')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', {
          'aria-keyshortcuts': ['ArrowUp', 'Enter', 'Space', 'Alt+Shift+T']
        })
      );
      expect(getAttribute(hasValue, 'aria-keyshortcuts')).toBe(
        'ArrowUp Enter Space Alt+Shift+T'
      );
    });

    test('aria-label', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-label': null })
      );
      expect(getAttribute(isEmpty, 'aria-label')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-label': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-label')).toBe('abc');
    });

    test('aria-labelledby', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-labelledby': null })
      );
      expect(getAttribute(isEmpty, 'aria-labelledby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-labelledby': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-labelledby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { 'aria-labelledby': ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-labelledby')).toBe(
        'abc def'
      );
    });

    test('aria-level', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-level': null })
      );
      expect(getAttribute(isEmpty, 'aria-level')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-level': 3 })
      );
      expect(getAttribute(hasValue, 'aria-level')).toBe('3');
    });

    test('aria-live', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-live': null })
      );
      expect(getAttribute(isEmpty, 'aria-live')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-live': 'polite' })
      );
      expect(getAttribute(hasValue, 'aria-live')).toBe('polite');
    });

    test('aria-modal', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-modal': null })
      );
      expect(getAttribute(isEmpty, 'aria-modal')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-modal': true })
      );
      expect(getAttribute(hasValue, 'aria-modal')).toBe('true');
    });

    test('aria-multiline', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-multiline': null })
      );
      expect(getAttribute(isEmpty, 'aria-multiline')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-multiline': true })
      );
      expect(getAttribute(hasValue, 'aria-multiline')).toBe('true');
    });

    test('aria-multiselectable', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-multiselectable': null })
      );
      expect(getAttribute(isEmpty, 'aria-multiselectable')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-multiselectable': true })
      );
      expect(getAttribute(hasValue, 'aria-multiselectable')).toBe('true');
    });

    test('aria-orientation', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-orientation': null })
      );
      expect(getAttribute(isEmpty, 'aria-orientation')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-orientation': 'vertical' })
      );
      expect(getAttribute(hasValue, 'aria-orientation')).toBe('vertical');
    });

    test('aria-owns', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-owns': null })
      );
      expect(getAttribute(isEmpty, 'aria-owns')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-owns': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-owns')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { 'aria-owns': ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-owns')).toBe('abc def');
    });

    test('aria-placeholder', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-placeholder': null })
      );
      expect(getAttribute(isEmpty, 'aria-placeholder')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-placeholder': 'MM-DD-YYYY' })
      );
      expect(getAttribute(hasValue, 'aria-placeholder')).toBe('MM-DD-YYYY');
    });

    test('aria-posinset', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-posinset': null })
      );
      expect(getAttribute(isEmpty, 'aria-posinset')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-posinset': 3 })
      );
      expect(getAttribute(hasValue, 'aria-posinset')).toBe('3');
    });

    test('aria-pressed', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-pressed': null })
      );
      expect(getAttribute(isEmpty, 'aria-pressed')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-pressed': true })
      );
      expect(getAttribute(hasValue, 'aria-pressed')).toBe('true');
    });

    test('aria-readonly', () => {
      const { container: isEmpty } = render(
        createElement('input', { 'aria-readonly': null })
      );
      expect(getAttribute(isEmpty, 'aria-readonly')).toBeNull();
      expect(getProperty(isEmpty, 'readOnly')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { 'aria-readonly': true })
      );
      expect(getAttribute(hasValue, 'aria-readonly')).toBe('true');
      expect(getProperty(hasValue, 'readOnly')).toBe(true);
    });

    test('aria-required', () => {
      const { container: isEmpty } = render(
        createElement('input', { 'aria-required': null })
      );
      expect(getAttribute(isEmpty, 'aria-required')).toBeNull();
      expect(getProperty(isEmpty, 'required')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { 'aria-required': true })
      );
      expect(getAttribute(hasValue, 'aria-required')).toBe('true');
      expect(getProperty(hasValue, 'required')).toBe(true);
    });

    test('role', () => {
      const { container: isEmpty } = render(
        createElement('div', { role: null })
      );
      expect(getAttribute(isEmpty, 'role')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { role: 'button' })
      );
      expect(getAttribute(hasValue, 'role')).toBe('button');
      const { container: roleIsNone } = render(
        createElement('div', { role: 'none' })
      );
      expect(getAttribute(roleIsNone, 'role')).toBe('presentation');
    });

    test('accessibilityRole "header" renders a native heading without role="heading"', () => {
      const { container: heading } = render(
        createElement('div', { accessibilityRole: 'header' })
      );
      expect(heading.firstChild.nodeName).toBe('H1');
      expect(getAttribute(heading, 'role')).toBeNull();

      const { container: levelTwo } = render(
        createElement('div', {
          accessibilityRole: 'header',
          'aria-level': 2
        })
      );
      expect(levelTwo.firstChild.nodeName).toBe('H2');
      expect(getAttribute(levelTwo, 'role')).toBeNull();
    });

    test('aria-roledescription', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-roledescription': null })
      );
      expect(getAttribute(isEmpty, 'aria-roledescription')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-roledescription': 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-roledescription')).toBe('abc');
    });

    test('aria-rowcount', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-rowcount': null })
      );
      expect(getAttribute(isEmpty, 'aria-rowcount')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-rowcount': 5 })
      );
      expect(getAttribute(hasValue, 'aria-rowcount')).toBe('5');
    });

    test('aria-rowindex', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-rowindex': null })
      );
      expect(getAttribute(isEmpty, 'aria-rowindex')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-rowindex': 5 })
      );
      expect(getAttribute(hasValue, 'aria-rowindex')).toBe('5');
    });

    test('aria-rowspan', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-rowspan': null })
      );
      expect(getAttribute(isEmpty, 'aria-rowspan')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-rowspan': 5 })
      );
      expect(getAttribute(hasValue, 'aria-rowspan')).toBe('5');
    });

    test('aria-selected', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-selected': null })
      );
      expect(getAttribute(isEmpty, 'aria-selected')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-selected': true })
      );
      expect(getAttribute(hasValue, 'aria-selected')).toBe('true');
    });

    test('aria-setsize', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-setsize': null })
      );
      expect(getAttribute(isEmpty, 'aria-setsize')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-setsize': 5 })
      );
      expect(getAttribute(hasValue, 'aria-setsize')).toBe('5');
    });

    test('aria-sort', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-sort': null })
      );
      expect(getAttribute(isEmpty, 'aria-sort')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-sort': 'ascending' })
      );
      expect(getAttribute(hasValue, 'aria-sort')).toBe('ascending');
    });

    test('aria-valuemax', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-valuemax': null })
      );
      expect(getAttribute(isEmpty, 'aria-valuemax')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-valuemax': 100 })
      );
      expect(getAttribute(hasValue, 'aria-valuemax')).toBe('100');
    });

    test('aria-valuemin', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-valuemin': null })
      );
      expect(getAttribute(isEmpty, 'aria-valuemin')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-valuemin': 10 })
      );
      expect(getAttribute(hasValue, 'aria-valuemin')).toBe('10');
    });

    test('aria-valuenow', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-valuenow': null })
      );
      expect(getAttribute(isEmpty, 'aria-valuenow')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-valuenow': 50 })
      );
      expect(getAttribute(hasValue, 'aria-valuenow')).toBe('50');
    });

    test('aria-valuetext', () => {
      const { container: isEmpty } = render(
        createElement('div', { 'aria-valuetext': null })
      );
      expect(getAttribute(isEmpty, 'aria-valuetext')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { 'aria-valuetext': 'fifty' })
      );
      expect(getAttribute(hasValue, 'aria-valuetext')).toBe('fifty');
    });

    test('dataSet', () => {
      const { container: hasValue } = render(
        createElement('div', {
          dataSet: {
            one: '1',
            two: '2',
            camelCase: 'camelCase',
            msPrefix: 'msPrefix'
          }
        })
      );
      expect(hasValue.firstChild).toMatchInlineSnapshot(`
       <div
         data-camel-case="camelCase"
         data-ms-prefix="msPrefix"
         data-one="1"
         data-two="2"
       />
      `);
    });

    test('focusable', () => {
      const { container: isEmpty } = render(
        createElement('div', { focusable: null })
      );
      expect(getAttribute(isEmpty, 'tabindex')).toBeNull();

      const { container: isTrue } = render(
        createElement('div', { focusable: true })
      );
      expect(getAttribute(isTrue, 'tabindex')).toBe('0');

      const { container: isFalseNativelyFocusable } = render(
        createElement('button', { focusable: false })
      );
      expect(getAttribute(isFalseNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isDisabledNativelyFocusable } = render(
        createElement('button', {
          'aria-disabled': true,
          focusable: true
        })
      );
      expect(getAttribute(isDisabledNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isTrueNativelyFocusable } = render(
        createElement('button', { focusable: true })
      );
      expect(getAttribute(isTrueNativelyFocusable, 'tabindex')).toBeNull();

      const { container: isFalseFocusableRole } = render(
        createElement('div', { role: 'button', focusable: false })
      );
      expect(getAttribute(isFalseFocusableRole, 'tabindex')).toBe('-1');
    });
  });
});
