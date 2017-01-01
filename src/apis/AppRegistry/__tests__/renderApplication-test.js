/* eslint-env jasmine, jest */

import { getApplication } from '../renderApplication';
import React from 'react';

const component = () => <div />;

describe('apis/AppRegistry/renderApplication', () => {
  test('getApplication', () => {
    const { element, stylesheet } = getApplication(component, {});

    expect(element).toBeTruthy();
    expect(stylesheet).toMatchSnapshot();
  });
});
