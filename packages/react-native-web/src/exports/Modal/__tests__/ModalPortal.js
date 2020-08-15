/* eslint-env jasmine, jest */

import ModalPortal from '../ModalPortal';
import React from 'react';
import { cleanup, render } from '@testing-library/react';

describe('components/Modal/ModalPortal', () => {
  afterEach(() => cleanup());

  test('creates portal outside of the react container', () => {
    const { getByTestId, container, baseElement } = render(
      <ModalPortal>
        <a data-testid={'hello'} href={'#hello'}>Hello World</a>
      </ModalPortal>
    );

    expect(container.children.length).toBe(0);
    expect(getByTestId('hello')).not.toBeNull();
    expect(baseElement.firstChild).toBe(container);
    expect(baseElement.lastChild.firstChild).toBe(getByTestId('hello'));
  });

  test('portal created is a div', () => {
    const { baseElement } = render(
      <ModalPortal>
        <a data-testid={'hello'} href={'#hello'}>Hello World</a>
      </ModalPortal>
    );

    expect(baseElement.lastChild.tagName).toBe('DIV');
  });
});
