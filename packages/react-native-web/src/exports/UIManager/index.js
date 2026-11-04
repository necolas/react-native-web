/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import getBoundingClientRect from '../../modules/getBoundingClientRect';
import setValueForStyles from '../../modules/setValueForStyles';
import type { LayoutCallback, MeasureInWindowCallback } from '../../types';

type Rect = {
  width: number,
  height: number,
  top: number,
  left: number
};

const hasOwnProperty: (this: Object, key: string) => boolean =
  Object.prototype.hasOwnProperty;

const getRect = (node: HTMLElement): Rect => {
  const height = node.offsetHeight;
  const width = node.offsetWidth;
  let left = node.offsetLeft;
  let top = node.offsetTop;
  // $FlowFixMe[incompatible-type] offsetParent is an HTMLElement or null
  let parent: ?HTMLElement = node.offsetParent;

  while (parent?.nodeType === 1 /* Node.ELEMENT_NODE */) {
    left += parent.offsetLeft + parent.clientLeft - parent.scrollLeft;
    top += parent.offsetTop + parent.clientTop - parent.scrollTop;
    // $FlowFixMe[incompatible-type] offsetParent is an HTMLElement or null
    parent = parent.offsetParent;
  }

  top -= window.scrollY;
  left -= window.scrollX;

  return { width, height, top, left };
};

const measureLayout = (
  node: HTMLElement,
  relativeToNativeNode: ?HTMLElement,
  callback: LayoutCallback
): void => {
  const relativeNode: ?HTMLElement =
    relativeToNativeNode ||
    node?.parentElement ||
    // A node at the root of a shadow tree is measured relative to its host
    // $FlowFixMe[prop-missing] the root node is a ShadowRoot or a Document
    node?.getRootNode().host;

  if (node && relativeNode) {
    setTimeout(() => {
      if (node.isConnected && relativeNode.isConnected) {
        const { height, left, top, width } = getRect(node);
        let x: number;
        let y: number;

        if (node.offsetParent === relativeNode) {
          // Fast path: same result as subtracting "getRect(relativeNode)",
          // without walking the ancestors of "relativeNode" a second time
          x =
            node.offsetLeft + relativeNode.clientLeft - relativeNode.scrollLeft;
          y = node.offsetTop + relativeNode.clientTop - relativeNode.scrollTop;
        } else {
          const relativeRect = getRect(relativeNode);
          x = left - relativeRect.left;
          y = top - relativeRect.top;
        }

        callback(x, y, width, height, left, top);
      }
    }, 0);
  }
};

const elementsToIgnore: { readonly [string]: boolean } = {
  A: true,
  BODY: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true
};

const UIManager = {
  blur(node: HTMLElement): void {
    try {
      node.blur();
    } catch {}
  },

  focus(node: HTMLElement): void {
    try {
      const name = node.nodeName;
      // A tabIndex of -1 allows element to be programmatically focused but
      // prevents keyboard focus. We don't want to set the tabindex value on
      // elements that should not prevent keyboard focus.
      if (
        node.getAttribute('tabIndex') == null &&
        node.isContentEditable !== true &&
        elementsToIgnore[name] == null
      ) {
        node.setAttribute('tabIndex', '-1');
      }
      node.focus();
    } catch {}
  },

  measure(node: HTMLElement, callback: LayoutCallback): void {
    measureLayout(node, null, callback);
  },

  measureInWindow(node: HTMLElement, callback: MeasureInWindowCallback): void {
    if (node) {
      setTimeout(() => {
        const rect = getBoundingClientRect(node);

        if (rect != null) {
          callback(rect.left, rect.top, rect.width, rect.height);
        } else {
          console.warn('measureInWindow cannot measure node', node);
          // $FlowFixMe[incompatible-type] same as React Native
          callback();
        }
      }, 0);
    }
  },

  measureLayout(
    node: HTMLElement,
    relativeToNativeNode: ?HTMLElement,
    onFail: (error: unknown) => void,
    onSuccess: LayoutCallback
  ): void {
    measureLayout(node, relativeToNativeNode, onSuccess);
  },

  updateView(node: HTMLElement, props: { [string]: any }): void {
    for (const prop in props) {
      if (!hasOwnProperty.call(props, prop)) {
        continue;
      }

      const value = props[prop];
      switch (prop) {
        case 'style': {
          setValueForStyles(node, value);
          break;
        }
        case 'class':
        case 'className': {
          node.setAttribute('class', value);
          break;
        }
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          // $FlowFixMe[prop-missing] node is an input or textarea element
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
      }
    }
  },

  configureNextLayoutAnimation(
    config: unknown,
    onAnimationDidEnd: () => void,
    onError: (error: unknown) => void
  ): void {
    onAnimationDidEnd();
  },

  // mocks
  setLayoutAnimationEnabledExperimental(enabled: boolean): void {}
};

export default UIManager;
