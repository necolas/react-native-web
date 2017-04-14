/* eslint-env jasmine, jest */

import React from 'react';
import { render } from 'enzyme';
import View from '../';

describe('components/View', () => {
  describe('rendered element', () => {
    test('is a "div" by default', () => {
      const component = render(<View />);
      expect(component).toMatchSnapshot();
    });

    test('is a "span" when inside <View accessibilityRole="button" />', () => {
      const component = render(<View accessibilityRole="button"><View /></View>);
      expect(component).toMatchSnapshot();
    });
  });

  test('prop "children"', () => {
    const children = <View testID="1" />;
    const component = render(<View>{children}</View>);
    expect(component).toMatchSnapshot();
  });

  describe('prop "hitSlop"', () => {
    it('renders a span with negative position offsets', () => {
      const component = render(<View hitSlop={{ top: 10, bottom: 10, right: 5, left: 5 }} />);
      expect(component).toMatchSnapshot();
    });

    it('handles partial offsets', () => {
      const component = render(<View hitSlop={{ top: 10 }} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('prop "pointerEvents"', () => {
    const component = render(<View pointerEvents="box-only" />);
    expect(component).toMatchSnapshot();
  });
});
