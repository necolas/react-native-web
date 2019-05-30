function body() {
  return document.body || { style: {}, tabIndex: -1 };
}

function bodyCall(method, arg) {
  return document.body && document.body[method](arg);
}

function bodyChildren() {
  return (document.body && document.body.children) || {};
}

export function mountAnchorNode() {
  const node = document.createElement('div');
  node.id = 'rnw_alert' + Math.round(Math.random() * 1000);
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
  body().tabIndex = 0;
  // Deactivate text selection
  bodySelect = body().style.userSelect;
  body().style.userSelect = 'none';
  // Disable for screen readers
  hideBackgroundFromScreenReaders();
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
  bodyCall('removeAttribute', 'tabIndex');
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

    if (prevAH === 'null') {
      target.setAttribute('aria-hidden', prevAH);
    } else {
      target.removeAttribute('aria-hidden');
    }

    target.removeAttribute('data-ah');
  });
}

let prevBodyOF, prevBodyMR;
export function disableBackgroundScroll() {
  const scrollBarWidth = window.innerWidth - ((document.body && document.body.clientWidth) || 0);
  const style = body().style;
  prevBodyOF = style.overflow;
  prevBodyMR = style.marginRight;

  style.overflow = 'hidden';
  style.marginRight = `${scrollBarWidth + prevBodyMR}px`;
}

export function enableBackgroundScroll() {
  const style = body().style;
  style.marginRight = prevBodyMR;
  style.overflow = prevBodyOF;
}
