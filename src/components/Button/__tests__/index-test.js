/* eslint-env jasmine, jest */

import React from 'react';
import Button from '..';
import { mount, shallow } from 'enzyme';

const findNativeButton = wrapper => wrapper.find('[role="button"]');

describe('components/Button', () => {
  describe('rendered element', () => {
    test('is a "div"', () => {
      const onPress = () => {}
      const button = findNativeButton(mount(<Button onPress={onPress} title="" />));
      expect(button.type()).toBe('div');
    });

    test('can display text', () => {
      const onPress = () => {}
      const text = 'Click me';
      const component = mount(<Button onPress={onPress} title={text} />);
      expect(component.text()).toEqual(text);
    });
  });

  test('prop "color"', () => {
    const onPress = () => {}
    const color = 'blue';
    const button = findNativeButton(mount(<Button color={color} onPress={onPress} title="" />));
    expect(button.prop('style')).toEqual({backgroundColor: color});
  });

  test('prop "disabled"', () => {
    const onPress = () => {}
    // true
    let component = shallow(<Button disabled={true} onPress={onPress} title="" />);
    expect(component.prop('disabled')).toEqual(true);
    component = shallow(<Button disabled onPress={onPress} title="" />);
    expect(component.prop('disabled')).toEqual(true);
    // false
    component = shallow(<Button disabled={false} onPress={onPress} title="" />);
    expect(component.prop('disabled')).toEqual(false);
    component = shallow(<Button onPress={onPress} title="" />);
    expect(component.prop('disabled')).toEqual(false);
  });

  test('prop "onPress"', () => {
    const onPress = jest.fn();
    const component = shallow(<Button onPress={onPress} title="" />);
    component.simulate('press');
    expect(onPress).toHaveBeenCalled();
  });
});
