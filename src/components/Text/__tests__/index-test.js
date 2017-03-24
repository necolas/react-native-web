/* eslint-env jasmine, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../';

jest.mock('react-dom');

describe('components/Text', () => {
  test('prop "children"', () => {
    const component = renderer.create(<Text>children</Text>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "numberOfLines"');

  test('prop "onPress"', () => {
    const onPress = e => {};
    const component = renderer.create(<Text onPress={onPress} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "selectable"', () => {
    let component = renderer.create(<Text />);
    expect(component.toJSON()).toMatchSnapshot();
    component = renderer.create(<Text selectable={false} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop `accessibilityRole=heading`', () => {
    const component = renderer.create(<Text accessibilityRole='heading'/>);
    expect(component.toJSON().type).toEqual('h1');
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop `accessibilityLevel`', () => {
    // when used with accessibilityRole=heading, should render heading of `level`
    const component = renderer.create(<Text accessibilityLevel={2} accessibilityRole='heading' />);
    expect(component.toJSON().type).toEqual('h2');
    expect(component.toJSON()).toMatchSnapshot();
  });
});
