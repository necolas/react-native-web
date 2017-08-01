/* eslint-env jasmine, jest */

import React from 'react';
import Button from '..';
import { mount, shallow } from 'enzyme';

const findNativeButton = wrapper => wrapper.getDOMNode();

describe('components/Button', () => {
  test('prop "color"', () => {
    const onPress = () => {};
    const color = 'blue';
    const button = findNativeButton(mount(<Button color={color} onPress={onPress} title="" />));
    expect(button.style.backgroundColor).toEqual(color);
  });

  test('prop "onPress"', () => {
    const onPress = jest.fn();
    const component = shallow(<Button onPress={onPress} title="" />);
    component.simulate('press');
    expect(onPress).toHaveBeenCalled();
  });

  test('prop "title"', () => {
    const onPress = () => {};
    const text = 'Click me';
    const component = mount(<Button onPress={onPress} title={text} />);
    expect(component.text()).toEqual(text);
  });
});
