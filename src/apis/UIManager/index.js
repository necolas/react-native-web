import asap from 'asap';
import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

const _measureLayout = (node, relativeToNativeNode, callback) => {
  asap(() => {
    const relativeNode = relativeToNativeNode || node.parentNode;
    const relativeRect = relativeNode.getBoundingClientRect();
    const { height, left, top, width } = node.getBoundingClientRect();
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
    _measureLayout(node, null, callback);
  },

  measureInWindow(node, callback) {
    const { height, left, top, width } = node.getBoundingClientRect();
    callback(left, top, width, height);
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    const relativeTo = relativeToNativeNode || node.parentNode;
    _measureLayout(node, relativeTo, onSuccess);
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
