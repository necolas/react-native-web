/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render } from '@testing-library/react';
import StyleResolver from '../../StyleSheet/StyleResolver';

function getAttribute(container, attribute) {
  return container.firstChild.getAttribute(attribute);
}

function getProperty(container, prop) {
  return container.firstChild[prop];
}

let styleResolver;

describe('exports/createElement', () => {
  beforeEach(() => {
    styleResolver = new StyleResolver();
  });

  afterEach(() => {
    styleResolver.clear();
  });

  test('renders different DOM elements', () => {
    let { container } = render(createElement('span', {}, styleResolver));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(createElement('main', {}, styleResolver)));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(
      createElement(
        'svg',
        { children: createElement('image', { href: '#href' }, styleResolver) },
        styleResolver
      )
    ));
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('string component type', () => {
      const { container } = render(
        createElement('span', { accessibilityRole: 'link' }, styleResolver)
      );
      expect(container.firstChild.nodeName).toBe('SPAN');
    });

    test('function component type', () => {
      const Custom = () => <div />;
      const { container } = render(
        createElement(Custom, { accessibilityRole: 'link' }, styleResolver)
      );
      expect(container.firstChild.nodeName).toBe('DIV');
    });
  });

  describe('accessibility props', () => {
    test('accessibilityActiveDescendant', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityActiveDescendant: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-activedescendant')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityActiveDescendant: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-activedescendant')).toBe('abc');
    });

    test('accessibilityAtomic', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityAtomic: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-atomic')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityAtomic: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-atomic')).toBe('true');
    });

    test('accessibilityAutoComplete', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityAutoComplete: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-autocomplete')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityAutoComplete: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-autocomplete')).toBe('true');
    });

    test('accessibilityBusy', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityBusy: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-busy')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityBusy: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-busy')).toBe('true');
    });

    test('accessibilityChecked', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityChecked: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-checked')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityChecked: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-checked')).toBe('true');
    });

    test('accessibilityColumnCount', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnCount: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-colcount')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityColumnCount: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-colcount')).toBe('5');
    });

    test('accessibilityColumnIndex', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnIndex: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-colindex')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityColumnIndex: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-colindex')).toBe('5');
    });

    test('accessibilityColumnSpan', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnSpan: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-colspan')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityColumnSpan: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-colspan')).toBe('5');
    });

    test('accessibilityControls', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityControls: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-controls')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityControls: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-controls')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityControls: ['abc', 'def'] }, styleResolver)
      );
      expect(getAttribute(hasMultipleValues, 'aria-controls')).toBe('abc def');
    });

    test('accessibilityCurrent', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityCurrent: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-current')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityCurrent: 'page' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-current')).toBe('page');
    });

    test('accessibilityDescribedBy', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityDescribedBy: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-describedby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityDescribedBy: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-describedby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityDescribedBy: ['abc', 'def'] }, styleResolver)
      );
      expect(getAttribute(hasMultipleValues, 'aria-describedby')).toBe('abc def');
    });

    test('accessibilityDetails', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityDetails: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-details')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityDetails: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-details')).toBe('abc');
    });

    test('accessibilityDisabled', () => {
      const { container: isEmpty } = render(
        createElement('button', { accessibilityDisabled: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-disabled')).toBeNull();
      expect(getProperty(isEmpty, 'disabled')).toBe(false);
      const { container: hasValue } = render(
        createElement('button', { accessibilityDisabled: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-disabled')).toBe('true');
      expect(getProperty(hasValue, 'disabled')).toBe(true);
    });

    test('accessibilityErrorMessage', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityErrorMessage: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-errormessage')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityErrorMessage: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-errormessage')).toBe('abc');
    });

    test('accessibilityExpanded', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityExpanded: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-expanded')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityExpanded: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-expanded')).toBe('true');
    });

    test('accessibilityFlowTo', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityFlowTo: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-flowto')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityFlowTo: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-flowto')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityFlowTo: ['abc', 'def'] }, styleResolver)
      );
      expect(getAttribute(hasMultipleValues, 'aria-flowto')).toBe('abc def');
    });

    test('accessibilityHasPopup', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityHasPopup: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-haspopup')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityHasPopup: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-haspopup')).toBe('true');
    });

    test('accessibilityHidden', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityHidden: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-hidden')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityHidden: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-hidden')).toBe('true');
    });

    test('accessibilityInvalid', () => {
      const { container: isEmpty } = render(
        createElement('input', { accessibilityInvalid: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-invalid')).toBeNull();
      const { container: hasValue } = render(
        createElement('input', { accessibilityInvalid: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-invalid')).toBe('true');
    });

    test('accessibilityKeyShortcuts', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityKeyShortcuts: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-keyshortcuts')).toBeNull();
      const { container: hasValue } = render(
        createElement(
          'div',
          {
            accessibilityKeyShortcuts: ['ArrowUp', 'Enter', 'Space', 'Alt+Shift+T']
          },
          styleResolver
        )
      );
      expect(getAttribute(hasValue, 'aria-keyshortcuts')).toBe('ArrowUp Enter Space Alt+Shift+T');
    });

    test('accessibilityLabel', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLabel: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-label')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLabel: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-label')).toBe('abc');
    });

    test('accessibilityLabelledBy', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLabelledBy: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-labelledby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLabelledBy: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-labelledby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityLabelledBy: ['abc', 'def'] }, styleResolver)
      );
      expect(getAttribute(hasMultipleValues, 'aria-labelledby')).toBe('abc def');
    });

    test('accessibilityLevel', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLevel: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-level')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLevel: 3 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-level')).toBe('3');
    });

    test('accessibilityLiveRegion', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLiveRegion: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-live')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLiveRegion: 'polite' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-live')).toBe('polite');
    });

    test('accessibilityModal', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityModal: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-modal')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityModal: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-modal')).toBe('true');
    });

    test('accessibilityMultiline', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityMultiline: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-multiline')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityMultiline: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-multiline')).toBe('true');
    });

    test('accessibilityMultiSelectable', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityMultiSelectable: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-multiselectable')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityMultiSelectable: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-multiselectable')).toBe('true');
    });

    test('accessibilityOrientation', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityOrientation: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-orientation')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityOrientation: 'vertical' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-orientation')).toBe('vertical');
    });

    test('accessibilityOwns', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityOwns: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-owns')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityOwns: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-owns')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityOwns: ['abc', 'def'] }, styleResolver)
      );
      expect(getAttribute(hasMultipleValues, 'aria-owns')).toBe('abc def');
    });

    test('accessibilityPlaceholder', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityPlaceholder: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-placeholder')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityPlaceholder: 'MM-DD-YYYY' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-placeholder')).toBe('MM-DD-YYYY');
    });

    test('accessibilityPosInSet', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityPosInSet: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-posinset')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityPosInSet: 3 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-posinset')).toBe('3');
    });

    test('accessibilityPressed', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityPressed: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-pressed')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityPressed: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-pressed')).toBe('true');
    });

    test('accessibilityReadOnly', () => {
      const { container: isEmpty } = render(
        createElement('input', { accessibilityReadOnly: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-readonly')).toBeNull();
      expect(getProperty(isEmpty, 'readOnly')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { accessibilityReadOnly: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-readonly')).toBe('true');
      expect(getProperty(hasValue, 'readOnly')).toBe(true);
    });

    test('accessibilityRequired', () => {
      const { container: isEmpty } = render(
        createElement('input', { accessibilityRequired: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-required')).toBeNull();
      expect(getProperty(isEmpty, 'required')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { accessibilityRequired: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-required')).toBe('true');
      expect(getProperty(hasValue, 'required')).toBe(true);
    });

    test('accessibilityRole', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRole: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'role')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRole: 'button' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'role')).toBe('button');
      expect(getAttribute(hasValue, 'tabIndex')).toBe('0');
      const { container: roleIsNone } = render(
        createElement('div', { accessibilityRole: 'none' }, styleResolver)
      );
      expect(getAttribute(roleIsNone, 'role')).toBe('presentation');
    });

    test('accessibilityRoleDescription', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRoleDescription: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-roledescription')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRoleDescription: 'abc' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-roledescription')).toBe('abc');
    });

    test('accessibilityRowCount', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRowCount: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-rowcount')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRowCount: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-rowcount')).toBe('5');
    });

    test('accessibilityRowIndex', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRowIndex: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-rowindex')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRowIndex: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-rowindex')).toBe('5');
    });

    test('accessibilityRowSpan', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRowSpan: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-rowspan')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRowSpan: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-rowspan')).toBe('5');
    });

    test('accessibilitySelected', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilitySelected: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-selected')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilitySelected: true }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-selected')).toBe('true');
    });

    test('accessibilitySetSize', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilitySetSize: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-setsize')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilitySetSize: 5 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-setsize')).toBe('5');
    });

    test('accessibilitySort', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilitySort: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-sort')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilitySort: 'ascending' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-sort')).toBe('ascending');
    });

    test('accessibilityValueMax', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityValueMax: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-valuemax')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityValueMax: 100 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-valuemax')).toBe('100');
    });

    test('accessibilityValueMin', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityValueMin: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-valuemin')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityValueMin: 10 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-valuemin')).toBe('10');
    });

    test('accessibilityValueNow', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityValueNow: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-valuenow')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityValueNow: 50 }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-valuenow')).toBe('50');
    });

    test('accessibilityValueText', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityValueText: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'aria-valuetext')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityValueText: 'fifty' }, styleResolver)
      );
      expect(getAttribute(hasValue, 'aria-valuetext')).toBe('fifty');
    });

    test('dataSet', () => {
      const { container: hasValue } = render(
        createElement(
          'div',
          {
            dataSet: {
              one: '1',
              two: '2',
              camelCase: 'camelCase',
              msPrefix: 'msPrefix'
            }
          },
          styleResolver
        )
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
        createElement('div', { focusable: null }, styleResolver)
      );
      expect(getAttribute(isEmpty, 'tabindex')).toBeNull();

      const { container: isTrue } = render(
        createElement('div', { focusable: true }, styleResolver)
      );
      expect(getAttribute(isTrue, 'tabindex')).toBe('0');

      const { container: isFalseNativelyFocusable } = render(
        createElement('button', { focusable: false }, styleResolver)
      );
      expect(getAttribute(isFalseNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isDisabledNativelyFocusable } = render(
        createElement(
          'button',
          {
            accessibilityDisabled: true,
            focusable: true
          },
          styleResolver
        )
      );
      expect(getAttribute(isDisabledNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isTrueNativelyFocusable } = render(
        createElement('button', { focusable: true }, styleResolver)
      );
      expect(getAttribute(isTrueNativelyFocusable, 'tabindex')).toBeNull();

      const { container: isFocusableRole } = render(
        createElement('div', { accessibilityRole: 'button', focusable: true }, styleResolver)
      );
      expect(getAttribute(isFocusableRole, 'tabindex')).toBe('0');

      const { container: isFalseFocusableRole } = render(
        createElement('div', { accessibilityRole: 'button', focusable: false }, styleResolver)
      );
      expect(getAttribute(isFalseFocusableRole, 'tabindex')).toBe('-1');
    });
  });
});
