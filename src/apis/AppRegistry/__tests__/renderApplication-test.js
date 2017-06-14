/* eslint-env jasmine, jest */

import { getApplication } from '../renderApplication';
import React from 'react';

const RootComponent = () => <div />;

describe('apis/AppRegistry/renderApplication', () => {
  test('getApplication', () => {
    const { element, stylesheets } = getApplication(RootComponent, {});

    expect(element).toMatchSnapshot();
    expect(stylesheets).toMatchSnapshot();
  });
});
