/**
 * Returns a high resolution time (if possible) in milliseconds
 * @returns {number}
 */
export function now() {
  if (window?.performance) {
    return window.performance.now();
  } else {
    return Date.now();
  }
}
