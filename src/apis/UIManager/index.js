import CSSPropertyOperations from 'react/lib/CSSPropertyOperations'

const measureAll = (node, callback, relativeToNativeNode) => {
  const { height, left, top, width } = node.getBoundingClientRect()
  const relativeNode = relativeToNativeNode || node.parentNode
  const relativeRect = relativeNode.getBoundingClientRect()
  const x = left - relativeRect.left
  const y = top - relativeRect.top
  callback(x, y, width, height, left, top)
}

const UIManager = {
  measure(node, callback) {
    measureAll(node, callback)
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    measureAll(node, (x, y, width, height) => onSuccess(x, y, width, height), relativeToNativeNode)
  },

  updateView(node, props) {
    for (const prop in props) {
      const value = props[prop]
      if (prop === 'style') {
        CSSPropertyOperations.setValueForStyles(node, value)
      } else if (prop === 'className') {
        node.classList.add(value)
      } else {
        node.setAttribute(prop, value)
      }
    }
  }
}

export default UIManager
