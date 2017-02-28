/* global document, window */

/**
 * Adapts focus styles based on the user's active input modality (i.e., how
 * they are interacting with the UI right now).
 *
 * Focus styles are only relevant when using the keyboard to interact with the
 * page. If we only show the focus ring when relevant, we can avoid user
 * confusion without compromising accessibility.
 *
 * The script uses two heuristics to determine whether the keyboard is being used:
 *
 * 1. a keydown event occurred immediately before a focus event;
 * 2. a focus event happened on an element which requires keyboard interaction (e.g., a text field);
 *
 * Based on https://github.com/WICG/modality
 */
const modality = () => {
  /**
   * Determine whether the keyboard is required when an element is focused
   */
  const proto = window.Element.prototype;
  const matcher = proto.matches ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.webkitMatchesSelector;
  const keyboardModalityWhitelist = [
    'input:not([type])',
    'input[type=text]',
    'input[type=number]',
    'input[type=date]',
    'input[type=time]',
    'input[type=datetime]',
    'textarea',
    '[role=textbox]',
    // indicates that a custom element supports the keyboard
    '[supports-modality=keyboard]'
  ].join(',');

  const focusTriggersKeyboardModality = el => {
    if (matcher) {
      return matcher.call(el, keyboardModalityWhitelist) && matcher.call(el, ':not([readonly])');
    } else {
      return false;
    }
  };

  /**
   * Disable the focus ring by default
   */
  const id = 'react-native-modality';
  let styleElement = document.getElementById(id);
  if (!styleElement) {
    const style = `<style id="${id}">:focus { outline: none; }</style>`;
    document.head.insertAdjacentHTML('afterbegin', style);
    styleElement = document.getElementById(id);
  }

  const disableFocus = () => {
    if (styleElement) {
      styleElement.disabled = false;
    }
  };

  const enableFocus = () => {
    if (styleElement) {
      styleElement.disabled = true;
    }
  };

  /**
   * Manage the modality focus state
   */
  let keyboardTimer;
  let hadKeyboardEvent = false;

  // track when the keyboard is in use
  document.body.addEventListener(
    'keydown',
    () => {
      hadKeyboardEvent = true;
      if (keyboardTimer) {
        clearTimeout(keyboardTimer);
      }
      keyboardTimer = setTimeout(
        () => {
          hadKeyboardEvent = false;
        },
        100
      );
    },
    true
  );

  // disable focus style reset when the keyboard is in use
  document.body.addEventListener(
    'focus',
    e => {
      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        enableFocus();
      }
    },
    true
  );

  // enable focus style reset when keyboard is no longer in use
  document.body.addEventListener(
    'blur',
    () => {
      if (!hadKeyboardEvent) {
        disableFocus();
      }
    },
    true
  );
};

export default modality;
