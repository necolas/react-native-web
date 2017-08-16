/* eslint-env jasmine, jest */

import React from 'react';
import { render, shallow } from 'enzyme';
import Text from '../';

describe('components/Text', () => {
  describe('rendered element', () => {
    test('is a "div" by default', () => {
      const component = shallow(<Text />);
      expect(component.type()).toBe('div');
    });

    test('is a "span" when inside <Text>', () => {
      const component = render(<Text children={<Text />} />);
      expect(component.find('span').length).toEqual(1);
    });

    test('includes dir="auto" prop', () => {
      const component = shallow(<Text />);
      expect(component.prop('dir')).toBe('auto');
    });

    test('allows "dir" to be overridden', () => {
      const component = shallow(<Text dir="rtl" />);
      expect(component.prop('dir')).toBe('rtl');
    });
  });

  test('prop "children"', () => {
    const children = <Text testID="1" />;
    const component = shallow(<Text children={children} />);
    expect(component.contains(children)).toEqual(true);
  });

  test('prop "numberOfLines"');

  test('prop "onPress"', () => {
    const onPress = e => {};
    const component = shallow(<Text onPress={onPress} />);
    expect(component).toMatchSnapshot();
  });

  test('prop "selectable"', () => {
    let component = shallow(<Text />);
    expect(component).toMatchSnapshot();
    component = shallow(<Text selectable={false} />);
    expect(component).toMatchSnapshot();
  });
});
