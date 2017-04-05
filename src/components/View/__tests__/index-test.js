/* eslint-env jasmine, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import View from '../';

jest.mock('react-dom');

describe('components/View', () => {
  describe('rendered element', () => {
    test('is a "div" by default', () => {
      const component = renderer.create(<View />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('is a "span" when inside <View accessibilityRole="button" />', () => {
      const component = renderer.create(<View accessibilityRole="button"><View /></View>);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  test('prop "children"', () => {
    const children = <View testID="1" />;
    const component = renderer.create(<View>{children}</View>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('prop "hitSlop"', () => {
    it('renders a span with negative position offsets', () => {
      const component = renderer.create(
        <View hitSlop={{ top: 10, bottom: 10, right: 5, left: 5 }} />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it('handles partial offsets', () => {
      const component = renderer.create(<View hitSlop={{ top: 10 }} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  test('prop "pointerEvents"', () => {
    const component = renderer.create(<View pointerEvents="box-only" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
