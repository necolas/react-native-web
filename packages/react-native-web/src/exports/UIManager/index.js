/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import setValueForStyles from '../../vendor/react-dom/setValueForStyles';

const getRect = node => {
  const height = node.offsetHeight;
  const width = node.offsetWidth;
  let left = node.offsetLeft;
  let top = node.offsetTop;
  node = node.offsetParent;

  while (node && node.nodeType === 1 /* Node.ELEMENT_NODE */) {
    left += node.offsetLeft - node.scrollLeft;
    top += node.offsetTop - node.scrollTop;
    node = node.offsetParent;
  }
  return { height, left, top, width };
};

const measureLayout = (node, relativeToNativeNode, callback) => {
  const relativeNode = relativeToNativeNode || (node && node.parentNode);
  if (node && relativeNode) {
    setTimeout(() => {
      const relativeRect = getRect(relativeNode);
      const { height, left, top, width } = getRect(node);
      const x = left - relativeRect.left;
      const y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};

const UIManager = {
  blur(node) {
    try {
      node.blur();
    } catch (err) {}
  },

  focus(node) {
    try {
      node.focus();
    } catch (err) {}
  },

  measure(node, callback) {
    measureLayout(node, null, callback);
  },

  measureInWindow(node, callback) {
    if (node) {
      setTimeout(() => {
        const { height, left, top, width } = getRect(node);
        callback(left, top, width, height);
      }, 0);
    }
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    measureLayout(node, relativeToNativeNode, onSuccess);
  },

  updateView(node, props, component /* only needed to surpress React errors in development */) {
    for (const prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }

      const value = props[prop];
      switch (prop) {
        case 'style': {
          setValueForStyles(node, value, component._reactInternalInstance);
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
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
      }
    }
  },

  configureNextLayoutAnimation(config, onAnimationDidEnd) {
    onAnimationDidEnd();
  },

  // mocks
  setLayoutAnimationEnabledExperimental() {}
};

export default UIManager;
