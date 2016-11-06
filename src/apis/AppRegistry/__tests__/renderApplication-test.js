/* eslint-env jasmine, jest */

import { prerenderApplication } from '../renderApplication';
import React from 'react';

const component = () => <div />;

describe('apis/AppRegistry/renderApplication', () => {
  it('prerenderApplication', () => {
    const { html, styleElement } = prerenderApplication(component, {});

    expect(html.indexOf('<div ') > -1).toBeTruthy();
    expect(styleElement.type).toEqual('style');
  });
});
