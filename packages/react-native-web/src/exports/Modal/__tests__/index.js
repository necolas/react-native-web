/* eslint-env jasmine, jest */

import Modal from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('components/Modal', () => {
  test('visible by default', () => {
    const { getByTestId } = render(
      <Modal>
        <a data-testid={'inside'} href={'#hello'}>
          Hello
        </a>
      </Modal>
    );
    const insideElement = getByTestId('inside');
    expect(insideElement).not.toBeNull();
    expect(insideElement).not.toBe(document.body);
  });

  test('render children when visible', () => {
    const { getByTestId } = render(
      <Modal visible={true}>
        <a data-testid={'inside'} href={'#hello'}>
          Hello
        </a>
      </Modal>
    );
    const insideElement = getByTestId('inside');
    expect(insideElement).not.toBeNull();
    expect(insideElement).not.toBe(document.body);
  });

  test('does not render children when not visible', () => {
    const { container } = render(
      <Modal visible={false}>
        <a data-testid={'inside'} href={'#hello'}>
          Hello
        </a>
      </Modal>
    );
    expect(container.children.length).toBe(0);
  });

  test('invisible modals will not be the active modal', () => {
    const { getByTestId } = render(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <Modal key={'modal-b'} visible={false}>
          <a data-testid={'inside-b'} href={'#hello'}>
            Hello
          </a>
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
          <a data-testid={'inside-a'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>
            Hello
          </a>
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
          <a data-testid={'inside-a'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <Modal key={'modal-b'} visible={false}>
          <a data-testid={'inside-b'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    rerender(
      <>
        <Modal key={'modal-a'} visible={true}>
          <a data-testid={'inside-a'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>
            Hello
          </a>
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
          <a data-testid={'inside-a'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <Modal key={'modal-b'} visible={true}>
          <a data-testid={'inside-b'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    rerender(
      <Modal key={'modal-a'} visible={true}>
        <a data-testid={'inside-a'} href={'#hello'}>
          Hello
        </a>
      </Modal>
    );

    const insideElement = getByTestId('inside-a');
    const dialogElements = document.body.querySelectorAll('[role=dialog]');
    expect(dialogElements.length).toBe(1);
    expect(dialogElements[0].contains(insideElement)).toBeTruthy();
  });

  test('executes onShow callback when initially showing', () => {
    const onShowCallback = jest.fn();
    render(<Modal onShow={onShowCallback} visible={true} />);
    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('does not execute onShow callback when initially hidden', () => {
    const onShowCallback = jest.fn();
    render(<Modal onShow={onShowCallback} visible={false} />);
    expect(onShowCallback).toBeCalledTimes(0);
  });

  test('does not execute onDismiss callback when initially hidden', () => {
    const onDismissCallback = jest.fn();
    render(<Modal onDismiss={onDismissCallback} visible={false} />);
    expect(onDismissCallback).toBeCalledTimes(0);
  });

  test('does not execute onDismiss callback when initially showing', () => {
    const onDismissCallback = jest.fn();
    render(<Modal onDismiss={onDismissCallback} visible={true} />);
    expect(onDismissCallback).toBeCalledTimes(0);
  });

  test('executes onShow callback when visibility changes', () => {
    const onShowCallback = jest.fn();
    const { rerender } = render(<Modal onShow={onShowCallback} visible={false} />);
    expect(onShowCallback).toBeCalledTimes(0);
    rerender(<Modal onShow={onShowCallback} visible={true} />);
    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('executes onDismiss callback when visibility changes', () => {
    const onDismissCallback = jest.fn();
    const { rerender } = render(<Modal onDismiss={onDismissCallback} visible={true} />);
    expect(onDismissCallback).toBeCalledTimes(0);
    rerender(<Modal onDismiss={onDismissCallback} visible={false} />);
    expect(onDismissCallback).toBeCalledTimes(1);
  });

  test('animationTypes none is the same as omitting', () => {
    const { rerender, baseElement } = render(<Modal animationType={'none'} visible={true} />);
    const animationNoneElement = baseElement.lastChild.lastChild;
    const animationNoneStyle = window.getComputedStyle(animationNoneElement, null);
    rerender(<Modal visible={true} />);
    const animationMissingElement = baseElement.lastChild.lastChild;
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

  test('creates view with role="modal" when active', () => {
    const { baseElement } = render(
      <Modal visible={true}>
        <a href={'#hello'}>Hello</a>
      </Modal>
    );
    const dialogElement = baseElement.lastChild.querySelector('[role="dialog"]');
    expect(dialogElement).not.toBeNull();
    expect(dialogElement.getAttribute('role')).toBe('dialog');
    expect(dialogElement.getAttribute('aria-modal')).toBe('true');
  });

  test('focus is trapped by default', () => {
    render(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    const outsideElement = document.querySelector('[data-testid="outside"]');
    const insideElement = document.querySelector('[data-testid="inside"]');
    outsideElement.focus();
    expect(document.activeElement).toBe(insideElement);
  });

  test('focus is trapped when active flag changes', () => {
    const { rerender } = render(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    const outsideElement = document.querySelector('[data-testid="outside"]');
    outsideElement.focus();
    expect(document.activeElement).toBe(outsideElement);

    rerender(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={true}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    const insideElement = document.querySelector('[data-testid="inside"]');
    expect(document.activeElement).toBe(insideElement);
  });

  test('focus is trapped when active', () => {
    render(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={true}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );

    const outsideElement = document.querySelector('[data-testid="outside"]');
    const insideElement = document.querySelector('[data-testid="inside"]');
    outsideElement.focus();
    expect(document.activeElement).toBe(insideElement);
  });

  test('focus wraps forwards', () => {
    render(
      <>
        <Modal visible={true}>
          <a data-testid={'inside-a'} href={'#'}>
            Inside A
          </a>
          <a data-testid={'inside-b'} href={'#'}>
            Inside B
          </a>
          <a data-testid={'inside-c'} href={'#'}>
            Inside C
          </a>
        </Modal>
      </>
    );

    const insideStartElement = document.querySelector('[data-testid="inside-a"]');
    const insideEndElement = document.querySelector('[data-testid="inside-c"]');
    // This is ugly - perhaps there's a better way?
    const focusBracket = insideEndElement.parentNode.parentNode.parentNode.nextSibling;
    insideEndElement.focus();
    focusBracket.focus();
    expect(document.activeElement).toBe(insideStartElement);
  });

  test('focus wraps backwards', () => {
    render(
      <>
        <Modal visible={true}>
          <a data-testid={'inside-a'} href={'#'}>
            Inside A
          </a>
          <a data-testid={'inside-b'} href={'#'}>
            Inside B
          </a>
          <a data-testid={'inside-c'} href={'#'}>
            Inside C
          </a>
        </Modal>
      </>
    );

    const insideStartElement = document.querySelector('[data-testid="inside-a"]');
    const insideEndElement = document.querySelector('[data-testid="inside-c"]');
    // This is ugly - perhaps there's a better way?
    const focusBracket = insideEndElement.parentNode.parentNode.parentNode.previousSibling;
    insideStartElement.focus();
    focusBracket.focus();
    expect(document.activeElement).toBe(insideEndElement);
  });

  test('focus is trapped without contents', () => {
    render(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={true}>
          <div>There are no focusable contents.</div>
        </Modal>
      </>
    );
    const outsideElement = document.querySelector('[data-testid="outside"]');
    outsideElement.focus();
    expect(document.activeElement).not.toBe(outsideElement);
    expect(document.activeElement).not.toBe(document.body);
  });

  test('focus is not trapped when inactive', () => {
    render(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
      </>
    );
    const outsideElement = document.querySelector('[data-testid="outside"]');
    outsideElement.focus();
    expect(document.activeElement).toBe(outsideElement);
  });

  test('creates portal outside of the react container', () => {
    const { container, baseElement } = render(
      <Modal visible={true}>
        <a data-testid={'hello'} href={'#hello'}>
          Hello World
        </a>
      </Modal>
    );
    const helloAnchor = document.querySelector('[data-testid="hello"]');
    expect(container.children.length).toBe(0);
    expect(helloAnchor).not.toBeNull();
    expect(baseElement.firstChild).toBe(container);
    expect(baseElement.lastChild.firstChild.contains(helloAnchor)).toBeTruthy();
  });

  test('portal created is a div', () => {
    const { baseElement } = render(
      <Modal visible={true}>
        <a data-testid={'hello'} href={'#hello'}>
          Hello World
        </a>
      </Modal>
    );
    expect(baseElement.lastChild.tagName).toBe('DIV');
  });

  test('ref must be set before `mount` hook', () => {
    const spy = jest.fn();

    function TestComponent() {
      React.useEffect(() => spy('mount'), []);
      return (
        <Modal visible={true}>
          <a ref={ref => (ref ? spy('ref') : spy('noref'))} />
        </Modal>
      );
    }

    render(<TestComponent />);

    expect(spy).toHaveBeenNthCalledWith(1, 'ref');
    expect(spy).toHaveBeenNthCalledWith(2, 'mount');
  });
});
