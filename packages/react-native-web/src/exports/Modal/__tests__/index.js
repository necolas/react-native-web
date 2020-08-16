/* eslint-env jasmine, jest */

import Modal from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('components/Modal', () => {
  test('render children when visible', () => {
    const { getByTestId } = render(
      <>
        <Modal visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );
    const insideElement = getByTestId('inside')

    expect(insideElement).not.toBeNull();
    expect(insideElement).not.toBe(document.body);
  });

  test('does not render children when not visible', () => {
    const { container } = render(
      <>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    expect(container.children.length).toBe(0);
  });

  test('invisible modals will not be the active modal', () => {
    const { getByTestId } = render(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
        <Modal key={'modal-b'} visible={false}>
          <a data-testid={'inside-b'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    const insideElement = getByTestId('inside-a');

    const dialogElements = document.body.querySelectorAll('[role=dialog]');
    expect(dialogElements.length).toBe(1);
    expect(dialogElements[0].contains(insideElement)).toBeTruthy();
  });

  test('multiple modals will only mark one as active', () => {
    const { getByTestId } = render(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    const insideElement = getByTestId('inside-b');

    const dialogElements = document.body.querySelectorAll('[role=dialog]');
    expect(dialogElements.length).toBe(1);
    expect(dialogElements[0].contains(insideElement)).toBeTruthy();
  });

  test('modal active state changes propogate', () => {
    const { rerender, getByTestId } = render(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
        <Modal key={'modal-b'} visible={false}>
          <a data-testid={'inside-b'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    rerender(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    const insideElement = getByTestId('inside-b');

    const dialogElements = document.body.querySelectorAll('[role=dialog]');
    expect(dialogElements.length).toBe(1);
    expect(dialogElements[0].contains(insideElement)).toBeTruthy();
  });

  test('removed modal sets others active state', () => {
    const { rerender, getByTestId } = render(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    rerender(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>Hello</a>
        </Modal>
      </>
    );

    const insideElement = getByTestId('inside-a');

    const dialogElements = document.body.querySelectorAll('[role=dialog]');
    expect(dialogElements.length).toBe(1);
    expect(dialogElements[0].contains(insideElement)).toBeTruthy();
  });
});
