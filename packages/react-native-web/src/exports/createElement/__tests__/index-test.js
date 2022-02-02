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
      createElement('svg', { children: createElement('image', { href: '#href' }) })
    ));
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('string component type', () => {
      const { container } = render(createElement('span', { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('SPAN');
    });

    test('function component type', () => {
      const Custom = () => <div />;
      const { container } = render(createElement(Custom, { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('DIV');
    });
  });

  describe('accessibility props', () => {
    test('accessibilityActiveDescendant', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityActiveDescendant: null })
      );
      expect(getAttribute(isEmpty, 'aria-activedescendant')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityActiveDescendant: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-activedescendant')).toBe('abc');
    });

    test('accessibilityAtomic', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityAtomic: null }));
      expect(getAttribute(isEmpty, 'aria-atomic')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityAtomic: true }));
      expect(getAttribute(hasValue, 'aria-atomic')).toBe('true');
    });

    test('accessibilityAutoComplete', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityAutoComplete: null })
      );
      expect(getAttribute(isEmpty, 'aria-autocomplete')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityAutoComplete: true })
      );
      expect(getAttribute(hasValue, 'aria-autocomplete')).toBe('true');
    });

    test('accessibilityBusy', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityBusy: null }));
      expect(getAttribute(isEmpty, 'aria-busy')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityBusy: true }));
      expect(getAttribute(hasValue, 'aria-busy')).toBe('true');
    });

    test('accessibilityChecked', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityChecked: null }));
      expect(getAttribute(isEmpty, 'aria-checked')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityChecked: true }));
      expect(getAttribute(hasValue, 'aria-checked')).toBe('true');
    });

    test('accessibilityColumnCount', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnCount: null })
      );
      expect(getAttribute(isEmpty, 'aria-colcount')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityColumnCount: 5 }));
      expect(getAttribute(hasValue, 'aria-colcount')).toBe('5');
    });

    test('accessibilityColumnIndex', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnIndex: null })
      );
      expect(getAttribute(isEmpty, 'aria-colindex')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityColumnIndex: 5 }));
      expect(getAttribute(hasValue, 'aria-colindex')).toBe('5');
    });

    test('accessibilityColumnSpan', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityColumnSpan: null })
      );
      expect(getAttribute(isEmpty, 'aria-colspan')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityColumnSpan: 5 }));
      expect(getAttribute(hasValue, 'aria-colspan')).toBe('5');
    });

    test('accessibilityControls', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityControls: null }));
      expect(getAttribute(isEmpty, 'aria-controls')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityControls: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-controls')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityControls: ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-controls')).toBe('abc def');
    });

    test('accessibilityCurrent', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityCurrent: null }));
      expect(getAttribute(isEmpty, 'aria-current')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityCurrent: 'page' })
      );
      expect(getAttribute(hasValue, 'aria-current')).toBe('page');
    });

    test('accessibilityDescribedBy', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityDescribedBy: null })
      );
      expect(getAttribute(isEmpty, 'aria-describedby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityDescribedBy: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-describedby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityDescribedBy: ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-describedby')).toBe('abc def');
    });

    test('accessibilityDetails', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityDetails: null }));
      expect(getAttribute(isEmpty, 'aria-details')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityDetails: 'abc' }));
      expect(getAttribute(hasValue, 'aria-details')).toBe('abc');
    });

    test('accessibilityDisabled', () => {
      const { container: isEmpty } = render(
        createElement('button', { accessibilityDisabled: null })
      );
      expect(getAttribute(isEmpty, 'aria-disabled')).toBeNull();
      expect(getProperty(isEmpty, 'disabled')).toBe(false);
      const { container: hasValue } = render(
        createElement('button', { accessibilityDisabled: true })
      );
      expect(getAttribute(hasValue, 'aria-disabled')).toBe('true');
      expect(getProperty(hasValue, 'disabled')).toBe(true);
    });

    test('accessibilityErrorMessage', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityErrorMessage: null })
      );
      expect(getAttribute(isEmpty, 'aria-errormessage')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityErrorMessage: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-errormessage')).toBe('abc');
    });

    test('accessibilityExpanded', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityExpanded: null }));
      expect(getAttribute(isEmpty, 'aria-expanded')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityExpanded: true }));
      expect(getAttribute(hasValue, 'aria-expanded')).toBe('true');
    });

    test('accessibilityFlowTo', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityFlowTo: null }));
      expect(getAttribute(isEmpty, 'aria-flowto')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityFlowTo: 'abc' }));
      expect(getAttribute(hasValue, 'aria-flowto')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityFlowTo: ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-flowto')).toBe('abc def');
    });

    test('accessibilityHasPopup', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityHasPopup: null }));
      expect(getAttribute(isEmpty, 'aria-haspopup')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityHasPopup: true }));
      expect(getAttribute(hasValue, 'aria-haspopup')).toBe('true');
    });

    test('accessibilityHidden', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityHidden: null }));
      expect(getAttribute(isEmpty, 'aria-hidden')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityHidden: true }));
      expect(getAttribute(hasValue, 'aria-hidden')).toBe('true');
    });

    test('accessibilityInvalid', () => {
      const { container: isEmpty } = render(createElement('input', { accessibilityInvalid: null }));
      expect(getAttribute(isEmpty, 'aria-invalid')).toBeNull();
      const { container: hasValue } = render(
        createElement('input', { accessibilityInvalid: true })
      );
      expect(getAttribute(hasValue, 'aria-invalid')).toBe('true');
    });

    test('accessibilityKeyShortcuts', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityKeyShortcuts: null })
      );
      expect(getAttribute(isEmpty, 'aria-keyshortcuts')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', {
          accessibilityKeyShortcuts: ['ArrowUp', 'Enter', 'Space', 'Alt+Shift+T']
        })
      );
      expect(getAttribute(hasValue, 'aria-keyshortcuts')).toBe('ArrowUp Enter Space Alt+Shift+T');
    });

    test('accessibilityLabel', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityLabel: null }));
      expect(getAttribute(isEmpty, 'aria-label')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityLabel: 'abc' }));
      expect(getAttribute(hasValue, 'aria-label')).toBe('abc');
    });

    test('accessibilityLabelledBy', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLabelledBy: null })
      );
      expect(getAttribute(isEmpty, 'aria-labelledby')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLabelledBy: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-labelledby')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityLabelledBy: ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-labelledby')).toBe('abc def');
    });

    test('accessibilityLevel', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityLevel: null }));
      expect(getAttribute(isEmpty, 'aria-level')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityLevel: 3 }));
      expect(getAttribute(hasValue, 'aria-level')).toBe('3');
    });

    test('accessibilityLiveRegion', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityLiveRegion: null })
      );
      expect(getAttribute(isEmpty, 'aria-live')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityLiveRegion: 'polite' })
      );
      expect(getAttribute(hasValue, 'aria-live')).toBe('polite');
    });

    test('accessibilityModal', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityModal: null }));
      expect(getAttribute(isEmpty, 'aria-modal')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityModal: true }));
      expect(getAttribute(hasValue, 'aria-modal')).toBe('true');
    });

    test('accessibilityMultiline', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityMultiline: null }));
      expect(getAttribute(isEmpty, 'aria-multiline')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityMultiline: true })
      );
      expect(getAttribute(hasValue, 'aria-multiline')).toBe('true');
    });

    test('accessibilityMultiSelectable', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityMultiSelectable: null })
      );
      expect(getAttribute(isEmpty, 'aria-multiselectable')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityMultiSelectable: true })
      );
      expect(getAttribute(hasValue, 'aria-multiselectable')).toBe('true');
    });

    test('accessibilityOrientation', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityOrientation: null })
      );
      expect(getAttribute(isEmpty, 'aria-orientation')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityOrientation: 'vertical' })
      );
      expect(getAttribute(hasValue, 'aria-orientation')).toBe('vertical');
    });

    test('accessibilityOwns', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityOwns: null }));
      expect(getAttribute(isEmpty, 'aria-owns')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityOwns: 'abc' }));
      expect(getAttribute(hasValue, 'aria-owns')).toBe('abc');
      const { container: hasMultipleValues } = render(
        createElement('div', { accessibilityOwns: ['abc', 'def'] })
      );
      expect(getAttribute(hasMultipleValues, 'aria-owns')).toBe('abc def');
    });

    test('accessibilityPlaceholder', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityPlaceholder: null })
      );
      expect(getAttribute(isEmpty, 'aria-placeholder')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityPlaceholder: 'MM-DD-YYYY' })
      );
      expect(getAttribute(hasValue, 'aria-placeholder')).toBe('MM-DD-YYYY');
    });

    test('accessibilityPosInSet', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityPosInSet: null }));
      expect(getAttribute(isEmpty, 'aria-posinset')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityPosInSet: 3 }));
      expect(getAttribute(hasValue, 'aria-posinset')).toBe('3');
    });

    test('accessibilityPressed', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityPressed: null }));
      expect(getAttribute(isEmpty, 'aria-pressed')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityPressed: true }));
      expect(getAttribute(hasValue, 'aria-pressed')).toBe('true');
    });

    test('accessibilityReadOnly', () => {
      const { container: isEmpty } = render(
        createElement('input', { accessibilityReadOnly: null })
      );
      expect(getAttribute(isEmpty, 'aria-readonly')).toBeNull();
      expect(getProperty(isEmpty, 'readOnly')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { accessibilityReadOnly: true })
      );
      expect(getAttribute(hasValue, 'aria-readonly')).toBe('true');
      expect(getProperty(hasValue, 'readOnly')).toBe(true);
    });

    test('accessibilityRequired', () => {
      const { container: isEmpty } = render(
        createElement('input', { accessibilityRequired: null })
      );
      expect(getAttribute(isEmpty, 'aria-required')).toBeNull();
      expect(getProperty(isEmpty, 'required')).toBe(false);
      const { container: hasValue } = render(
        createElement('input', { accessibilityRequired: true })
      );
      expect(getAttribute(hasValue, 'aria-required')).toBe('true');
      expect(getProperty(hasValue, 'required')).toBe(true);
    });

    test('accessibilityRole', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityRole: null }));
      expect(getAttribute(isEmpty, 'role')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityRole: 'button' }));
      expect(getAttribute(hasValue, 'role')).toBe('button');
      expect(getAttribute(hasValue, 'tabIndex')).toBe('0');
      const { container: roleIsNone } = render(createElement('div', { accessibilityRole: 'none' }));
      expect(getAttribute(roleIsNone, 'role')).toBe('presentation');
    });

    test('accessibilityRoleDescription', () => {
      const { container: isEmpty } = render(
        createElement('div', { accessibilityRoleDescription: null })
      );
      expect(getAttribute(isEmpty, 'aria-roledescription')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityRoleDescription: 'abc' })
      );
      expect(getAttribute(hasValue, 'aria-roledescription')).toBe('abc');
    });

    test('accessibilityRowCount', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityRowCount: null }));
      expect(getAttribute(isEmpty, 'aria-rowcount')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityRowCount: 5 }));
      expect(getAttribute(hasValue, 'aria-rowcount')).toBe('5');
    });

    test('accessibilityRowIndex', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityRowIndex: null }));
      expect(getAttribute(isEmpty, 'aria-rowindex')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityRowIndex: 5 }));
      expect(getAttribute(hasValue, 'aria-rowindex')).toBe('5');
    });

    test('accessibilityRowSpan', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityRowSpan: null }));
      expect(getAttribute(isEmpty, 'aria-rowspan')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityRowSpan: 5 }));
      expect(getAttribute(hasValue, 'aria-rowspan')).toBe('5');
    });

    test('accessibilitySelected', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilitySelected: null }));
      expect(getAttribute(isEmpty, 'aria-selected')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilitySelected: true }));
      expect(getAttribute(hasValue, 'aria-selected')).toBe('true');
    });

    test('accessibilitySetSize', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilitySetSize: null }));
      expect(getAttribute(isEmpty, 'aria-setsize')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilitySetSize: 5 }));
      expect(getAttribute(hasValue, 'aria-setsize')).toBe('5');
    });

    test('accessibilitySort', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilitySort: null }));
      expect(getAttribute(isEmpty, 'aria-sort')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilitySort: 'ascending' })
      );
      expect(getAttribute(hasValue, 'aria-sort')).toBe('ascending');
    });

    test('accessibilityValueMax', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityValueMax: null }));
      expect(getAttribute(isEmpty, 'aria-valuemax')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityValueMax: 100 }));
      expect(getAttribute(hasValue, 'aria-valuemax')).toBe('100');
    });

    test('accessibilityValueMin', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityValueMin: null }));
      expect(getAttribute(isEmpty, 'aria-valuemin')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityValueMin: 10 }));
      expect(getAttribute(hasValue, 'aria-valuemin')).toBe('10');
    });

    test('accessibilityValueNow', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityValueNow: null }));
      expect(getAttribute(isEmpty, 'aria-valuenow')).toBeNull();
      const { container: hasValue } = render(createElement('div', { accessibilityValueNow: 50 }));
      expect(getAttribute(hasValue, 'aria-valuenow')).toBe('50');
    });

    test('accessibilityValueText', () => {
      const { container: isEmpty } = render(createElement('div', { accessibilityValueText: null }));
      expect(getAttribute(isEmpty, 'aria-valuetext')).toBeNull();
      const { container: hasValue } = render(
        createElement('div', { accessibilityValueText: 'fifty' })
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
      const { container: isEmpty } = render(createElement('div', { focusable: null }));
      expect(getAttribute(isEmpty, 'tabindex')).toBeNull();

      const { container: isTrue } = render(createElement('div', { focusable: true }));
      expect(getAttribute(isTrue, 'tabindex')).toBe('0');

      const { container: isFalseNativelyFocusable } = render(
        createElement('button', { focusable: false })
      );
      expect(getAttribute(isFalseNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isDisabledNativelyFocusable } = render(
        createElement('button', {
          accessibilityDisabled: true,
          focusable: true
        })
      );
      expect(getAttribute(isDisabledNativelyFocusable, 'tabindex')).toBe('-1');

      const { container: isTrueNativelyFocusable } = render(
        createElement('button', { focusable: true })
      );
      expect(getAttribute(isTrueNativelyFocusable, 'tabindex')).toBeNull();

      const { container: isFocusableRole } = render(
        createElement('div', { accessibilityRole: 'button', focusable: true })
      );
      expect(getAttribute(isFocusableRole, 'tabindex')).toBe('0');

      const { container: isFalseFocusableRole } = render(
        createElement('div', { accessibilityRole: 'button', focusable: false })
      );
      expect(getAttribute(isFalseFocusableRole, 'tabindex')).toBe('-1');
    });
  });
});
