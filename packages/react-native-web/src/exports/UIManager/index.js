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
import type {
  MeasureOnSuccessCallback,
  MeasureInWindowOnSuccessCallback,
  MeasureLayoutOnSuccessCallback
} from '../../types';

type Rect = {
  width: number,
  height: number,
  top: number,
  left: number,
  offsetTop: number,
  offsetLeft: number
};

const hasOwnProperty: (this: Object, key: string) => boolean =
  Object.prototype.hasOwnProperty;

const getRect = (node: HTMLElement): Rect => {
  const height = node.offsetHeight;
  const width = node.offsetWidth;
  let offsetLeft = node.offsetLeft;
  let offsetTop = node.offsetTop;
  let scrollLeft = window.scrollX;
  let scrollTop = window.scrollY;
  // $FlowFixMe[incompatible-type] offsetParent is an HTMLElement or null
  let parent: ?HTMLElement = node.offsetParent;

  while (parent?.nodeType === 1 /* Node.ELEMENT_NODE */) {
    offsetLeft += parent.offsetLeft + parent.clientLeft;
    offsetTop += parent.offsetTop + parent.clientTop;
    scrollLeft += parent.scrollLeft;
    scrollTop += parent.scrollTop;
    // $FlowFixMe[incompatible-type] offsetParent is an HTMLElement or null
    parent = parent.offsetParent;
  }

  const top = offsetTop - scrollTop;
  const left = offsetLeft - scrollLeft;

  return { width, height, top, left, offsetTop, offsetLeft };
};

const measureLayout = (
  node: HTMLElement,
  relativeToNativeNode: ?HTMLElement,
  callback: MeasureOnSuccessCallback
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
        const rect = getRect(node);
        const relativeRect = getRect(relativeNode);

        // Like React Native, ignore scroll offsets: a node in a ScrollView is
        // measured relative to the scroll content
        const x = rect.offsetLeft - relativeRect.offsetLeft;
        const y = rect.offsetTop - relativeRect.offsetTop;

        callback(x, y, rect.width, rect.height, rect.left, rect.top);
      }
    }, 0);
  }
};

const elementsToIgnore = new Set(['A', 'BODY', 'INPUT', 'SELECT', 'TEXTAREA']);

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
        !elementsToIgnore.has(name)
      ) {
        node.setAttribute('tabIndex', '-1');
      }
      node.focus();
    } catch {}
  },

  measure(node: HTMLElement, callback: MeasureOnSuccessCallback): void {
    measureLayout(node, null, callback);
  },

  measureInWindow(
    node: HTMLElement,
    callback: MeasureInWindowOnSuccessCallback
  ): void {
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
    onSuccess: MeasureLayoutOnSuccessCallback
  ): void {
    measureLayout(node, relativeToNativeNode, (x, y, width, height) =>
      onSuccess(x, y, width, height)
    );
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
