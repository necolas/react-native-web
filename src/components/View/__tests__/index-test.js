/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import View from '../';

describe('components/View', () => {
  describe('rendered element', () => {
    test('is a "div" by default', () => {
      const component = shallow(<View />);
      expect(component.type()).toBe('div');
    });
  });

  describe('prop "children"', () => {
    test('text node throws error (single)', () => {
      const render = () => shallow(<View>'hello'</View>);
      expect(render).toThrow();
    });

    test('text node throws error (array)', () => {
      const render = () =>
        shallow(
          <View>
            <View />
            'hello'
            <View />
          </View>
        );
      expect(render).toThrow();
    });

    test('non-text is rendered', () => {
      const children = <View testID="1" />;
      const component = shallow(<View>{children}</View>);
      expect(component.contains(children)).toEqual(true);
    });
  });

  describe('prop "hitSlop"', () => {
    it('renders a span with negative position offsets', () => {
      const component = shallow(<View hitSlop={{ top: 10, bottom: 10, right: 5, left: 5 }} />);
      const span = component.find('span');
      expect(span.length).toBe(1);
      expect(span.prop('style')).toMatchSnapshot();
    });

    it('handles partial offsets', () => {
      const component = shallow(<View hitSlop={{ top: 10 }} />);
      const span = component.find('span');
      expect(span.prop('style')).toMatchSnapshot();
    });
  });

  test('prop "pointerEvents"', () => {
    const component = shallow(<View pointerEvents="box-only" />);
    expect(component.prop('className').indexOf('pointerEvents') > -1).toBe(true);
  });
});
