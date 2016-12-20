class Clipboard {
  static getString() {
    return Promise.resolve('');
  }

  static setString(text) {
    let success = false;
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    try {
      document.execCommand('copy');
      success = true;
    } catch (e) {}
    document.body.removeChild(textField);
    return success;
  }
}

module.exports = Clipboard;
