/* eslint-env jasmine, jest */

import React from 'react';
import { render, shallow } from 'enzyme';
import View from '../';

describe('components/View', () => {
  describe('rendered element', () => {
    test('is a "div" by default', () => {
      const component = shallow(<View />);
      expect(component.type()).toBe('div');
    });
  });

  test('prop "children"', () => {
    const children = <View testID="1" />;
    const component = shallow(<View>{children}</View>);
    expect(component.contains(children)).toEqual(true);
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
