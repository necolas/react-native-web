/* eslint-env jasmine, jest */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { defaultBrowserChromeSize } from '../constants';

import {
  clearPointers,
  createEventTarget,
  describeWithPointerEvent,
  testWithPointerType
} from '../index';

/**
 * Unit test helpers
 */
describeWithPointerEvent('describeWithPointerEvent', (pointerEvent) => {
  test('provides boolean to tests', () => {
    expect(pointerEvent).toMatchSnapshot();
  });

  testWithPointerType('testWithPointerType', (pointerType) => {
    expect(pointerType).toMatchSnapshot();
  });
});

/**
 * createEventTarget
 */
describe('createEventTarget', () => {
  let node;
  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    node = null;
    clearPointers();
  });

  test('returns expected API', () => {
    const target = createEventTarget(node);
    expect(target.node).toEqual(node);
    expect(Object.keys(target)).toMatchInlineSnapshot(`
      Array [
        "node",
        "blur",
        "click",
        "contextmenu",
        "error",
        "focus",
        "keydown",
        "keyup",
        "load",
        "pointercancel",
        "pointerdown",
        "pointerhover",
        "pointermove",
        "pointerover",
        "pointerout",
        "pointerup",
        "scroll",
        "select",
        "selectionchange",
        "tap",
        "virtualclick",
        "setBoundingClientRect",
      ]
    `);
  });

  /**
   * Simple events
   */

  describe('.blur()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('blur', (e) => {
        expect(e.relatedTarget).toBeNull();
      });
      target.blur();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      const relatedTarget = document.createElement('div');
      node.addEventListener('blur', (e) => {
        expect(e.relatedTarget).toBe(relatedTarget);
      });
      target.blur({ relatedTarget });
    });
  });

  describe('.click()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('click', (e) => {
        expect(e.altKey).toEqual(false);
        expect(e.button).toEqual(0);
        expect(e.buttons).toEqual(0);
        expect(e.clientX).toEqual(0);
        expect(e.clientY).toEqual(0);
        expect(e.ctrlKey).toEqual(false);
        expect(e.detail).toEqual(1);
        expect(typeof e.getModifierState).toEqual('function');
        expect(e.metaKey).toEqual(false);
        expect(e.movementX).toEqual(0);
        expect(e.movementY).toEqual(0);
        expect(e.offsetX).toEqual(0);
        expect(e.offsetY).toEqual(0);
        expect(e.pageX).toEqual(0);
        expect(e.pageY).toEqual(0);
        expect(typeof e.preventDefault).toEqual('function');
        expect(e.screenX).toEqual(0);
        expect(e.screenY).toEqual(defaultBrowserChromeSize);
        expect(e.shiftKey).toEqual(false);
        expect(typeof e.timeStamp).toEqual('number');
      });
      target.click();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      node.addEventListener('click', (e) => {
        expect(e.altKey).toEqual(true);
        expect(e.button).toEqual(1);
        expect(e.buttons).toEqual(4);
        expect(e.clientX).toEqual(10);
        expect(e.clientY).toEqual(20);
        expect(e.ctrlKey).toEqual(true);
        expect(e.metaKey).toEqual(true);
        expect(e.movementX).toEqual(1);
        expect(e.movementY).toEqual(2);
        expect(e.offsetX).toEqual(5);
        expect(e.offsetY).toEqual(5);
        expect(e.pageX).toEqual(50);
        expect(e.pageY).toEqual(50);
        expect(e.screenX).toEqual(10);
        expect(e.screenY).toEqual(20 + defaultBrowserChromeSize);
        expect(e.shiftKey).toEqual(true);
      });
      target.click({
        altKey: true,
        button: 1,
        buttons: 4,
        x: 10,
        y: 20,
        ctrlKey: true,
        metaKey: true,
        movementX: 1,
        movementY: 2,
        offsetX: 5,
        offsetY: 5,
        pageX: 50,
        pageY: 50,
        shiftKey: true
      });
    });
  });

  describe('.focus()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('focus', (e) => {
        expect(e.relatedTarget).toBeNull();
      });
      target.focus();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      const relatedTarget = document.createElement('div');
      node.addEventListener('focus', (e) => {
        expect(e.relatedTarget).toBe(relatedTarget);
      });
      target.focus({ relatedTarget });
    });
  });

  describe('.keydown()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('keydown', (e) => {
        expect(e.altKey).toEqual(false);
        expect(e.ctrlKey).toEqual(false);
        expect(typeof e.getModifierState).toEqual('function');
        expect(e.key).toEqual('');
        expect(e.metaKey).toEqual(false);
        expect(typeof e.preventDefault).toEqual('function');
        expect(e.shiftKey).toEqual(false);
        expect(typeof e.timeStamp).toEqual('number');
      });
      target.keydown();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      node.addEventListener('keydown', (e) => {
        expect(e.altKey).toEqual(true);
        expect(e.ctrlKey).toEqual(true);
        expect(e.isComposing).toEqual(true);
        expect(e.key).toEqual('Enter');
        expect(e.metaKey).toEqual(true);
        expect(e.shiftKey).toEqual(true);
      });
      target.keydown({
        altKey: true,
        ctrlKey: true,
        isComposing: true,
        key: 'Enter',
        metaKey: true,
        shiftKey: true
      });
    });
  });

  describe('.keyup()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('keyup', (e) => {
        expect(e.altKey).toEqual(false);
        expect(e.ctrlKey).toEqual(false);
        expect(typeof e.getModifierState).toEqual('function');
        expect(e.key).toEqual('');
        expect(e.metaKey).toEqual(false);
        expect(typeof e.preventDefault).toEqual('function');
        expect(e.shiftKey).toEqual(false);
        expect(typeof e.timeStamp).toEqual('number');
      });
      target.keydown();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      node.addEventListener('keyup', (e) => {
        expect(e.altKey).toEqual(true);
        expect(e.ctrlKey).toEqual(true);
        expect(e.isComposing).toEqual(true);
        expect(e.key).toEqual('Enter');
        expect(e.metaKey).toEqual(true);
        expect(e.shiftKey).toEqual(true);
      });
      target.keyup({
        altKey: true,
        ctrlKey: true,
        isComposing: true,
        key: 'Enter',
        metaKey: true,
        shiftKey: true
      });
    });
  });

  describe('.scroll()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('scroll', (e) => {
        expect(e.type).toEqual('scroll');
      });
      target.scroll();
    });
  });

  describe('.virtualclick()', () => {
    test('default', () => {
      const target = createEventTarget(node);
      node.addEventListener('click', (e) => {
        expect(e.altKey).toEqual(false);
        expect(e.button).toEqual(0);
        expect(e.buttons).toEqual(0);
        expect(e.clientX).toEqual(0);
        expect(e.clientY).toEqual(0);
        expect(e.ctrlKey).toEqual(false);
        expect(e.detail).toEqual(0);
        expect(typeof e.getModifierState).toEqual('function');
        expect(e.metaKey).toEqual(false);
        expect(e.movementX).toEqual(0);
        expect(e.movementY).toEqual(0);
        expect(e.offsetX).toEqual(0);
        expect(e.offsetY).toEqual(0);
        expect(e.pageX).toEqual(0);
        expect(e.pageY).toEqual(0);
        expect(typeof e.preventDefault).toEqual('function');
        expect(e.screenX).toEqual(0);
        expect(e.screenY).toEqual(0);
        expect(e.shiftKey).toEqual(false);
        expect(typeof e.timeStamp).toEqual('number');
      });
      target.virtualclick();
    });

    test('custom payload', () => {
      const target = createEventTarget(node);
      node.addEventListener('click', (e) => {
        // expect most of the custom payload to be ignored
        expect(e.altKey).toEqual(true);
        expect(e.button).toEqual(1);
        expect(e.buttons).toEqual(0);
        expect(e.clientX).toEqual(0);
        expect(e.clientY).toEqual(0);
        expect(e.ctrlKey).toEqual(true);
        expect(e.detail).toEqual(0);
        expect(e.metaKey).toEqual(true);
        expect(e.pageX).toEqual(0);
        expect(e.pageY).toEqual(0);
        expect(e.screenX).toEqual(0);
        expect(e.screenY).toEqual(0);
        expect(e.shiftKey).toEqual(true);
      });
      target.virtualclick({
        altKey: true,
        button: 1,
        buttons: 4,
        x: 10,
        y: 20,
        ctrlKey: true,
        metaKey: true,
        pageX: 50,
        pageY: 50,
        shiftKey: true
      });
    });
  });

  /**
   * Complex event sequences
   *
   * ...coming soon
   */

  /**
   * Other APIs
   */

  test('.setBoundingClientRect()', () => {
    const target = createEventTarget(node);
    expect(node.getBoundingClientRect()).toMatchInlineSnapshot(`
      Object {
        "bottom": 0,
        "height": 0,
        "left": 0,
        "right": 0,
        "top": 0,
        "width": 0,
      }
    `);
    target.setBoundingClientRect({ x: 10, y: 20, width: 100, height: 200 });
    expect(node.getBoundingClientRect()).toMatchInlineSnapshot(`
      Object {
        "bottom": 220,
        "height": 200,
        "left": 10,
        "right": 110,
        "top": 20,
        "width": 100,
      }
    `);
  });
});
