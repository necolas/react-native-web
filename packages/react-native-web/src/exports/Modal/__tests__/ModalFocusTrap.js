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
    expect(container.firstChild.children.length).toBe(0);
    expect(container.lastChild.children.length).toBe(0);
    expect(container).toMatchSnapshot();
  });

  test('focus is trapped by default', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    const outsideElement = getByTestId('outside');
    const insideElement = getByTestId('inside');

    outsideElement.focus();

    expect(document.activeElement).toBe(insideElement);
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

  test('focus is trapped when active function', () => {
    const active = jest.fn().mockReturnValue(true);

    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={active}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    expect(active).toBeCalledTimes(1);

    const outsideElement = getByTestId('outside');
    const insideElement = getByTestId('inside');

    outsideElement.focus();

    expect(active).toBeCalledTimes(2);

    expect(document.activeElement).toBe(insideElement);
  });

  test('focus is trapped without contents', () => {
    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap>
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

  test('focus is trapped when inactive function', () => {
    const active = jest.fn().mockReturnValue(false);

    const { getByTestId } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>Outside</a>
        <ModalFocusTrap active={active}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalFocusTrap>
      </>
    );

    expect(active).toBeCalledTimes(1);

    const outsideElement = getByTestId('outside');

    outsideElement.focus();

    expect(active).toBeCalledTimes(2);
    expect(document.activeElement).toBe(outsideElement);
  });

});
