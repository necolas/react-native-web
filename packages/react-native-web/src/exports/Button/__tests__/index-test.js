/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import Button from '..';
import React from 'react';
import StyleSheet from '../../StyleSheet';
import TouchableOpacity from '../../TouchableOpacity';
import { render, shallow } from 'enzyme';

describe('components/Button', () => {
  test('prop "color"', () => {
    const onPress = () => {};
    const color = 'blue';
    const button = shallow(<Button color={color} onPress={onPress} title="" />);
    const style = StyleSheet.flatten(button.prop('style'));
    expect(style.backgroundColor).toEqual(color);
  });

  test('prop "onPress"', () => {
    const onPress = jest.fn();
    const component = shallow(<Button onPress={onPress} title="" />);
    component.find(TouchableOpacity).simulate('press');
    expect(onPress).toHaveBeenCalled();
  });

  test('prop "title"', () => {
    const onPress = () => {};
    const text = 'Click me';
    const component = render(<Button onPress={onPress} title={text} />);
    expect(component.text()).toEqual(text);
  });
});
