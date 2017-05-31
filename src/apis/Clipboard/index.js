/* global window */
/**
 * @flow
 */

class Clipboard {
  static isSupported() {
    return (
      typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy')
    );
  }

  static getString() {
    return Promise.resolve('');
  }

  static setString(text) {
    let success = false;

    // add the text to a hidden node
    const node = document.createElement('span');
    node.textContent = text;
    node.style.position = 'absolute';
    node.style.opacity = '0';
    document.body.appendChild(node);

    // select the text
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);

    // attempt to copy
    try {
      document.execCommand('copy');
      success = true;
    } catch (e) {}

    // remove selection and node
    selection.removeAllRanges();
    document.body.removeChild(node);

    return success;
  }
}

module.exports = Clipboard;
