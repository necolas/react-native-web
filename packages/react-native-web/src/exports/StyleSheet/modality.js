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
 * Based on https://github.com/WICG/focus-ring
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import hash from '../../vendor/hash';

const modalityClassName =
  'rn-' +
  (process.env.NODE_ENV === 'production'
    ? hash('rnw-modality')
    : 'modality-' + hash('rnw-modality'));

const rule = `:focus:not(.${modalityClassName}) { outline: none; }`;

const modality = styleElement => {
  if (!canUseDOM) {
    return;
  }

  let hadKeyboardEvent = false;
  let keyboardThrottleTimeoutID = 0;

  const proto = window.Element.prototype;
  const matches =
    proto.matches ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.webkitMatchesSelector;

  // These elements should always have a focus ring drawn, because they are
  // associated with switching to a keyboard modality.
  const keyboardModalityWhitelist = [
    'input:not([type])',
    'input[type=text]',
    'input[type=search]',
    'input[type=url]',
    'input[type=tel]',
    'input[type=email]',
    'input[type=password]',
    'input[type=number]',
    'input[type=date]',
    'input[type=month]',
    'input[type=week]',
    'input[type=time]',
    'input[type=datetime]',
    'input[type=datetime-local]',
    'textarea',
    '[role=textbox]'
  ].join(',');

  /**
   * Computes whether the given element should automatically trigger the
   * `focus-ring`.
   */
  const focusTriggersKeyboardModality = el => {
    if (matches) {
      return matches.call(el, keyboardModalityWhitelist) && matches.call(el, ':not([readonly])');
    } else {
      return false;
    }
  };

  /**
   * On `keydown`, set `hadKeyboardEvent`, to be removed 100ms later if there
   * are no further keyboard events. The 100ms throttle handles cases where
   * focus is redirected programmatically after a keyboard event, such as
   * opening a menu or dialog.
   */
  const handleKeyDown = e => {
    hadKeyboardEvent = true;
    if (keyboardThrottleTimeoutID !== 0) {
      clearTimeout(keyboardThrottleTimeoutID);
    }
    keyboardThrottleTimeoutID = setTimeout(() => {
      hadKeyboardEvent = false;
      keyboardThrottleTimeoutID = 0;
    }, 100);
  };

  let hasModality = false;

  /**
   * Display the focus-ring when the keyboard was used to focus
   */
  const handleFocus = e => {
    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      e.target.classList.add(modalityClassName);
      hasModality = true;
    }
  };

  /**
   * Remove the focus-ring when the keyboard was used to focus
   */
  const handleBlur = e => {
    if (hasModality) {
      e.target.classList.remove(modalityClassName);
      hasModality = false;
    }
  };

  if (document.body && document.body.addEventListener) {
    styleElement.sheet.insertRule(rule, 0);
    document.body.addEventListener('keydown', handleKeyDown, true);
    document.body.addEventListener('focus', handleFocus, true);
    document.body.addEventListener('blur', handleBlur, true);
  }
};

export default modality;
