/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import renderer from 'react-test-renderer';

describe('components/ActivityIndicator', () => {
  test('default render', () => {
    const component = renderer.create(<ActivityIndicator />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('other render', () => {
    const component = renderer.create(
      <ActivityIndicator animating={false} hidesWhenStopped={false} size="large" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
