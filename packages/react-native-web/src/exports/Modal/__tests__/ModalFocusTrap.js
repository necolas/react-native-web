/* eslint-env jasmine, jest */

import ModalFocusTrap from '../ModalFocusTrap';
import React from 'react';
import { cleanup, render } from '@testing-library/react';

describe('components/Modal/ModalFocusTrap', () => {
  afterEach(() => cleanup());

  test('creates focusable "brackets"', () => {
    const { container } = render(
      <ModalFocusTrap>
        <a href={'#hello'}>Hello</a>
      </ModalFocusTrap>
    );

    expect(container.children.length).toBe(3);

    const beforeBracket = container.firstChild;
    const afterBracket = container.lastChild;

    expect(beforeBracket.children.length).toBe(0);
    expect(afterBracket.children.length).toBe(0);

    expect(beforeBracket.getAttribute('aria-hidden')).toBe('true');
    expect(beforeBracket.getAttribute('tabindex')).toBe('0');

    expect(afterBracket.getAttribute('aria-hidden')).toBe('true');
    expect(afterBracket.getAttribute('tabindex')).toBe('0');

    expect(container).toMatchSnapshot();
  });

  test('focus is not trapped by default', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    const outsideElement = getByTestId('outside');

    outsideElement.focus();

    expect(document.activeElement).toBe(outsideElement);
  });

  test('focus is trapped when active flag changes', () => {
    const { getByTestId, rerender } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    getByTestId('outside').focus();

    expect(document.activeElement).toBe(getByTestId('outside'));

    rerender(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    expect(document.activeElement).toBe(getByTestId('inside'));
  });

  test('focus is trapped when active', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    const outsideElement = getByTestId('outside');
    const insideElement = getByTestId('inside');

    outsideElement.focus();

    expect(document.activeElement).toBe(insideElement);
  });

  test('focus is trapped without contents', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active>
          <div data-testid={'inside'}>There are no focusable contents.</div>
        </ModalFocusTrap>
      </>
    );

    const outsideElement = getByTestId('outside');

    outsideElement.focus();

    expect(document.activeElement).toBe(document.body);
  });

  test('focus is not trapped when inactive', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    const outsideElement = getByTestId('outside');

    outsideElement.focus();

    expect(document.activeElement).toBe(outsideElement);
  });
});
