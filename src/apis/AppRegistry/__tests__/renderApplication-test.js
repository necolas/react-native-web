/* eslint-env jasmine, jest */

import { getApplication } from '../renderApplication';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const RootComponent = () => <div />;

describe('apis/AppRegistry/renderApplication', () => {
  test('getApplication', () => {
    const { element, stylesheets } = getApplication(RootComponent, {});

    expect(element).toMatchSnapshot();
    stylesheets.forEach(sheet => {
      const result = ReactDOMServer.renderToStaticMarkup(sheet);
      expect(result).toMatchSnapshot();
    });
  });
});
