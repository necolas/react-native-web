/* eslint-env jasmine, jest */

import React from 'react';
import { render } from 'enzyme';
import Text from '../';

describe('components/Text', () => {
  test('prop "children"', () => {
    const component = render(<Text>children</Text>);
    expect(component).toMatchSnapshot();
  });

  test('prop "numberOfLines"');

  test('prop "onPress"', () => {
    const onPress = e => {};
    const component = render(<Text onPress={onPress} />);
    expect(component).toMatchSnapshot();
  });

  test('prop "selectable"', () => {
    let component = render(<Text />);
    expect(component).toMatchSnapshot();
    component = render(<Text selectable={false} />);
    expect(component).toMatchSnapshot();
  });
});
