/* eslint-env jasmine, jest */

import Modal from '..';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRootContext from '../../../vendor/renderRootContext';

describe('components/Modal', () => {
  test('visible by default', () => {
    const { getByTestId } = renderRootContext(
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
    const { getByTestId } = renderRootContext(
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
    const { container } = renderRootContext(
      <Modal visible={false}>
        <a data-testid={'inside'} href={'#hello'}>
          Hello
        </a>
      </Modal>
    );
    expect(container.children.length).toBe(0);
  });

  test('invisible modals will not be the active modal', () => {
    const { getByTestId } = renderRootContext(
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
    const { getByTestId } = renderRootContext(
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
    const { rerender, getByTestId } = renderRootContext(
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
    const { rerender, getByTestId } = renderRootContext(
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
    renderRootContext(<Modal onShow={onShowCallback} visible={true} />);
    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('does not execute onShow callback when initially hidden', () => {
    const onShowCallback = jest.fn();
    renderRootContext(<Modal onShow={onShowCallback} visible={false} />);
    expect(onShowCallback).toBeCalledTimes(0);
  });

  test('does not execute onDismiss callback when initially hidden', () => {
    const onDismissCallback = jest.fn();
    renderRootContext(<Modal onDismiss={onDismissCallback} visible={false} />);
    expect(onDismissCallback).toBeCalledTimes(0);
  });

  test('does not execute onDismiss callback when initially showing', () => {
    const onDismissCallback = jest.fn();
    renderRootContext(<Modal onDismiss={onDismissCallback} visible={true} />);
    expect(onDismissCallback).toBeCalledTimes(0);
  });

  test('executes onShow callback when visibility changes', () => {
    const onShowCallback = jest.fn();
    const { rerender } = renderRootContext(<Modal onShow={onShowCallback} visible={false} />);
    expect(onShowCallback).toBeCalledTimes(0);
    rerender(<Modal onShow={onShowCallback} visible={true} />);
    expect(onShowCallback).toBeCalledTimes(1);
  });

  test('executes onDismiss callback when visibility changes', () => {
    const onDismissCallback = jest.fn();
    const { rerender } = renderRootContext(<Modal onDismiss={onDismissCallback} visible={true} />);
    expect(onDismissCallback).toBeCalledTimes(0);
    rerender(<Modal onDismiss={onDismissCallback} visible={false} />);
    expect(onDismissCallback).toBeCalledTimes(1);
  });

  test('animationTypes none is the same as omitting', () => {
    const { rerender, baseElement } = renderRootContext(
      <Modal animationType={'none'} visible={true} />
    );
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
    const { baseElement } = renderRootContext(
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
    renderRootContext(
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
    const { rerender } = renderRootContext(
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

  test('focus is brought back to the element that triggered modal after closing', () => {
    const { rerender } = renderRootContext(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <a data-testid={'modal-trigger'} href={'#modal-trigger'}>
          Outside
        </a>
      </>
    );

    const modalTrigger = document.querySelector('[data-testid="modal-trigger"]');
    modalTrigger.focus();
    expect(document.activeElement).toBe(modalTrigger);

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
        <a data-testid={'modal-trigger'} href={'#modal-trigger'}>
          Outside
        </a>
      </>
    );

    const insideElement = document.querySelector('[data-testid="inside"]');
    expect(document.activeElement).toBe(insideElement);

    rerender(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <a data-testid={'modal-trigger'} href={'#modal-trigger'}>
          Outside
        </a>
      </>
    );

    expect(document.activeElement).toBe(modalTrigger);
  });

  test('focus is brought back to the body when element that triggered modal is removed from the DOM after closing modal', () => {
    const { rerender } = renderRootContext(
      <>
        <a data-testid={'outside'} href={'#outside'}>
          Outside
        </a>
        <Modal visible={false}>
          <a data-testid={'inside'} href={'#hello'}>
            Hello
          </a>
        </Modal>
        <a data-testid={'modal-trigger'} href={'#modal-trigger'}>
          Outside
        </a>
      </>
    );

    const modalTrigger = document.querySelector('[data-testid="modal-trigger"]');
    modalTrigger.focus();
    expect(document.activeElement).toBe(modalTrigger);

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
        <a data-testid={'modal-trigger'} href={'#modal-trigger'}>
          Outside
        </a>
      </>
    );

    const insideElement = document.querySelector('[data-testid="inside"]');
    expect(document.activeElement).toBe(insideElement);

    rerender(
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

    expect(document.activeElement).toBe(document.body);
  });

  test('focus is trapped when active', () => {
    renderRootContext(
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
    renderRootContext(
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
    renderRootContext(
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
    renderRootContext(
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
    renderRootContext(
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
    const { container, baseElement } = renderRootContext(
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
    const { baseElement } = renderRootContext(
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
          <a ref={(ref) => (ref ? spy('ref') : spy('noref'))} />
        </Modal>
      );
    }

    renderRootContext(<TestComponent />);

    expect(spy).toHaveBeenNthCalledWith(1, 'ref');
    expect(spy).toHaveBeenNthCalledWith(2, 'mount');
  });

  test('escape key fires onRequestClose', () => {
    const spy = jest.fn();

    renderRootContext(<Modal onRequestClose={spy} visible={true} />);

    fireEvent.keyUp(document, { key: 'Escape' });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('escape key fires onRequestClose for top modal only', () => {
    const spyA = jest.fn();
    const spyB = jest.fn();

    renderRootContext(
      <>
        <Modal onRequestClose={spyA} visible={true} />
        <Modal onRequestClose={spyB} visible={true} />
      </>
    );

    fireEvent.keyUp(document, { key: 'Escape' });

    expect(spyA).toHaveBeenCalledTimes(0);
    expect(spyB).toHaveBeenCalledTimes(1);
  });

  test('escape key fires onRequestClose for top modal only with animation', () => {
    const spyA = jest.fn();
    const spyB = jest.fn();

    const { getByTestId, rerender } = renderRootContext(
      <>
        <Modal animationType={'slide'} onRequestClose={spyA} visible={false}>
          <a data-testid={'a'} />

          <Modal animationType={'slide'} onRequestClose={spyB} visible={false}>
            <a data-testid={'b'} />
          </Modal>
        </Modal>
      </>
    );

    rerender(
      <>
        <Modal animationType={'slide'} onRequestClose={spyA} visible={true}>
          <a data-testid={'a'} />

          <Modal animationType={'slide'} onRequestClose={spyB} visible={true}>
            <a data-testid={'b'} />
          </Modal>
        </Modal>
      </>
    );

    // This is kind of ugly but I can't find a better way to target just the animation div
    const animationAElement =
      getByTestId('a').parentElement.parentElement.parentElement.parentElement;
    const animationBElement =
      getByTestId('b').parentElement.parentElement.parentElement.parentElement;

    fireEvent.animationEnd(animationAElement);
    fireEvent.animationEnd(animationBElement);

    fireEvent.keyUp(document, { key: 'Escape' });

    expect(spyA).toHaveBeenCalledTimes(0);
    expect(spyB).toHaveBeenCalledTimes(1);
  });
});
