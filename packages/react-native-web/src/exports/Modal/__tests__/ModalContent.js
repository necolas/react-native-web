/* eslint-env jasmine, jest */

import ModalContent from '../ModalContent';
import React from 'react';
import { cleanup, render } from '@testing-library/react';

describe('components/Modal/ModalContent', () => {
  afterEach(() => cleanup());

  test('creates view with role="modal" when active', () => {
    const { container } = render(
      <ModalContent>
        <a href={'#hello'}>Hello</a>
      </ModalContent>
    );

    expect(container.children.length).toBe(1);
    expect(container.firstChild.getAttribute('role')).toBe('modal');
    expect(container.firstChild.getAttribute('aria-modal')).toBe('true');
  });
});
