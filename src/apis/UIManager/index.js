import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'
import flattenStyle from '../StyleSheet/flattenStyle'
import processTransform from '../StyleSheet/processTransform'

const _measureLayout = (node, relativeToNativeNode, callback) => {
  const relativeNode = relativeToNativeNode || node.parentNode
  const relativeRect = relativeNode.getBoundingClientRect()
  const { height, left, top, width } = node.getBoundingClientRect()
  const x = left - relativeRect.left
  const y = top - relativeRect.top
  callback(x, y, width, height, left, top)
}

const UIManager = {
  blur(node) {
    try { node.blur() } catch (err) {}
  },

  focus(node) {
    try { node.focus() } catch (err) {}
  },

  measure(node, callback) {
    _measureLayout(node, null, callback)
  },

  measureInWindow(node, callback) {
    const { height, left, top, width } = node.getBoundingClientRect()
    callback(left, top, width, height)
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    const relativeTo = relativeToNativeNode || node.parentNode
    _measureLayout(node, relativeTo, onSuccess)
  },

  updateView(node, props) {
    for (const prop in props) {
      let nativeProp
      const value = props[prop]

      switch(prop) {
        case 'style':
          // convert styles to DOM-styles
          CSSPropertyOperations.setValueForStyles(node, processTransform(flattenStyle(value)))
          break;
        case 'class':
        case 'className':
          nativeProp = 'class'
          // prevent class names managed by React Native from being replaced
          const className = node.getAttribute(nativeProp) + ' ' + value
          node.setAttribute(nativeProp, className)
          break;
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value
          break;
        default:
          node.setAttribute(prop, value)
      }
    }
  }
}

module.exports = UIManager
