/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import { render } from 'enzyme';

describe('components/ActivityIndicator', () => {
  test('default render', () => {
    const component = render(<ActivityIndicator />);
    expect(component).toMatchSnapshot();
  });

  test('other render', () => {
    const component = render(
      <ActivityIndicator animating={false} hidesWhenStopped={false} size="large" />
    );
    expect(component).toMatchSnapshot();
  });
});
