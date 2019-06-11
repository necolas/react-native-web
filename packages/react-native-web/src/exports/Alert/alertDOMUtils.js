function body() {
  return document.body || { style: {}, tabindex: -1 };
}

function bodyCall(method, arg1, arg2) {
  return document.body && document.body[method](arg1, arg2);
}

function bodyChildren() {
  return (document.body && document.body.children) || {};
}

export function mountAnchorNode() {
  const node = document.createElement('div');
  node.id = 'rnw_alert' + Math.round(Math.random() * 1000);
  node.setAttribute('data-alert', 'true');
  bodyCall('appendChild', node);
  return node;
}

export function unmountAnchorNode(node) {
  if (!node.parentNode) return;
  bodyCall('removeChild', node);
}

let prevActiveElement;
let focusTrap;
let bodySelect;
export function deactivateBackground(node) {
  // Save active element for later
  prevActiveElement = document.activeElement;
  // Trap the tab key
  window.addEventListener('keydown', trapTabKey);
  // Focus the trap
  focusTrap = document.querySelector('[data-focustrap=alert]');
  focusTrap && focusTrap.focus();
  // turn body into a focusable element
  setBodyFocusable(true);
  // Deactivate text selection
  bodySelect = body().style.userSelect;
  body().style.userSelect = 'none';
  // Disable for screen readers
  hideBackgroundFromScreenReaders(node);
  // Disable background scroll
  disableBackgroundScroll();
}

export function reactivateBackground(node) {
  // Open the trap
  window.removeEventListener('keydown', trapTabKey);
  // Focus previous active element
  prevActiveElement && prevActiveElement.focus();
  // Reactivate text selection
  body().style.userSelect = bodySelect;
  // Enable screen readers
  showBackgroundToScreeReaders();
  // Enable scroll
  enableBackgroundScroll();
  // Clean up
  setBodyFocusable(false);
}

export function trapTabKey(e) {
  if (e.which !== 9) return;

  // If the body (first element) is focused and hit the key tab, go to trap
  if (document.activeElement === document.body && !e.shiftKey) {
    e.preventDefault();
    focusTrap && focusTrap.focus();
  }

  // If the trap is focused and hit the shift+tab, go to body
  if (document.activeElement === focusTrap && e.shiftKey) {
    e.preventDefault();
    bodyCall('focus');
  }
}

export function hideBackgroundFromScreenReaders(node) {
  Array.prototype.forEach.call(bodyChildren(), target => {
    if (target === node) return;

    const ariaHidden = target.getAttribute('aria-hidden') || 'null';
    target.setAttribute('data-ah', ariaHidden);
    target.setAttribute('aria-hidden', 'true');
  });
}

export function showBackgroundToScreeReaders() {
  Array.prototype.forEach.call(bodyChildren(), target => {
    const prevAH = target.getAttribute('data-ah');

    if (prevAH !== 'null') {
      target.setAttribute('aria-hidden', prevAH);
    } else {
      target.removeAttribute('aria-hidden');
    }

    target.removeAttribute('data-ah');
  });
}

let prevBodyOF, prevBodyMR;
export function disableBackgroundScroll() {
  const style = body().style;
  prevBodyOF = style.overflow;
  prevBodyMR = style.marginRight;
  style.overflow = 'hidden';

  const html = document && document.children && document.children[0];
  const b = document.body;
  if (html && b) {
    const scrollBarWidth = html.getBoundingClientRect().width - (b.clientWidth || 0);
    style.marginRight = `${scrollBarWidth + prevBodyMR}px`;
  }
}

export function enableBackgroundScroll() {
  const style = body().style;
  style.marginRight = prevBodyMR;
  style.overflow = prevBodyOF;
}

const TI_BUFFER = 'data-ti';
export function setBodyFocusable(active) {
  if (active) {
    const ti = bodyCall('getAttribute', 'tabindex');
    bodyCall('setAttribute', TI_BUFFER, ti);
    bodyCall('setAttribute', 'tabindex', '0');
  } else {
    const originalTi = bodyCall('getAttribute', TI_BUFFER);
    if (originalTi === 'null') {
      bodyCall('removeAttribute', 'tabindex');
    } else {
      bodyCall('setAttribute', 'tabindex', originalTi);
    }
    bodyCall('removeAttribute', TI_BUFFER);
  }
}
