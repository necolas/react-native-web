/* eslint-env jasmine, jest */

import ModalAnimation from '../ModalAnimation';
import React from 'react';
import { cleanup, render } from '@testing-library/react';

describe('components/Modal/ModalAnimation', () => {
  afterEach(() => cleanup());

  test('render children when visible', () => {
    const { container, getByTestId } = render(
      <>
        <ModalAnimation visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );
    const insideElement = getByTestId('inside')

    expect(container.firstChild.firstChild).toEqual(insideElement);
    expect(container.firstChild.children.length).toEqual(1);
  });

  test('does not render children when not visible', () => {
    const { container } = render(
      <>
        <ModalAnimation visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(container.children.length).toBe(0);
  });

  test('executes onShow callback when initially showing', () => {
    const onShowCallback = jest.fn();

    render(
      <>
        <ModalAnimation onShow={onShowCallback} visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('does not execute onShow callback when initially hidden', () => {
    const onShowCallback = jest.fn();

    render(
      <>
        <ModalAnimation onShow={onShowCallback} visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onShowCallback).toBeCalledTimes(0);
  });

  test('executes onDismiss callback when initially hidden', () => {
    const onDismissCallback = jest.fn();

    render(
      <>
        <ModalAnimation onDismiss={onDismissCallback} visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onDismissCallback).toBeCalledTimes(1);
  });

  test('does not execute onDismiss callback when initially showing', () => {
    const onDismissCallback = jest.fn();

    render(
      <>
        <ModalAnimation onDismiss={onDismissCallback} visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onDismissCallback).toBeCalledTimes(0);
  });

  test('executes onShow callback when visibility changes', () => {
    const onShowCallback = jest.fn();

    const { rerender } = render(
      <>
        <ModalAnimation onShow={onShowCallback} visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onShowCallback).toBeCalledTimes(0);

    rerender(
      <>
        <ModalAnimation onShow={onShowCallback} visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('executes onDismiss callback when visibility changes', () => {
    const onDismissCallback = jest.fn();

    const { rerender } = render(
      <>
        <ModalAnimation onDismiss={onDismissCallback} visible={true}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onDismissCallback).toBeCalledTimes(0);

    rerender(
      <>
        <ModalAnimation onDismiss={onDismissCallback} visible={false}>
          <a data-testid={'inside'} href={'#hello'}>Hello</a>
        </ModalAnimation>
      </>
    );

    expect(onDismissCallback).toBeCalledTimes(1);
  });

  test('animationType none is the same as omitting', () => {
    const { getByTestId } = render(
      <>
        <div data-testid={'none'}>
          <ModalAnimation animationType={'none'} visible={true} />
        </div>
        <div data-testid={'missing'}>
          <ModalAnimation visible={true} />
        </div>
      </>
    );

    const animationNoneElement = getByTestId('none').firstChild;
    const animationMissingElement = getByTestId('missing').firstChild;

    const animationNoneStyle = window.getComputedStyle(animationNoneElement, null);
    const animationMissingStyle = window.getComputedStyle(animationMissingElement, null);

    const styleProps = new Set();

    for (let i = 0; i < animationNoneStyle.length; i++) {
      styleProps.add(animationNoneStyle[i]);
    }

    for (let i = 0; i < animationMissingStyle.length; i++) {
      styleProps.add(animationMissingStyle[i]);
    }

    for (const prop of styleProps) {
      expect(animationNoneStyle[prop]).toEqual(animationMissingStyle[prop]);
    }
  });

});
