/* eslint-env mocha */

import assert from 'assert';
import { prerenderApplication } from '../renderApplication';
import React from 'react';

const component = () => <div />;

suite('apis/AppRegistry/renderApplication', () => {
  test('prerenderApplication', () => {
    const { html, styleElement } = prerenderApplication(component, {});

    assert.ok(html.indexOf('<div ') > -1);
    assert.equal(styleElement.type, 'style');
  });
});
