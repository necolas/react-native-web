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

  test('prop "selectable"', () => {
    let component = renderer.create(<Text />);
    expect(component.toJSON()).toMatchSnapshot();
    component = renderer.create(<Text selectable={false} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
