import asap from 'asap';
import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

const getRect = (node) => {
  const height = node.offsetHeight;
  const left = node.offsetLeft;
  const top = node.offsetTop;
  const width = node.offsetWidth;
  return { height, left, top, width };
};

const measureLayout = (node, relativeToNativeNode, callback) => {
  asap(() => {
    const relativeNode = relativeToNativeNode || node.parentNode;
    const relativeRect = getRect(relativeNode);
    const { height, left, top, width } = getRect(node);
    const x = left - relativeRect.left;
    const y = top - relativeRect.top;
    callback(x, y, width, height, left, top);
  });
};

const UIManager = {
  blur(node) {
    try { node.blur(); } catch (err) {}
  },

  focus(node) {
    try { node.focus(); } catch (err) {}
  },

  measure(node, callback) {
    measureLayout(node, null, callback);
  },

  measureInWindow(node, callback) {
    const { height, left, top, width } = getRect(node);
    callback(left, top, width, height);
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    const relativeTo = relativeToNativeNode || node.parentNode;
    measureLayout(node, relativeTo, onSuccess);
  },

  updateView(node, props, component /* only needed to surpress React errors in development */) {
    for (const prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }

      const value = props[prop];
      switch (prop) {
        case 'style': {
          CSSPropertyOperations.setValueForStyles(node, value, component._reactInternalInstance);
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
  }
};

module.exports = UIManager;
