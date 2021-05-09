/* eslint-env jasmine, jest */

// JSDOM doesn't implement ResizeObserver
class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}
window.ResizeObserver = ResizeObserver;

// JSDOM doesn't provide values for 'clientWidth' etc
Object.defineProperty(window.document.documentElement, 'clientHeight', {
  get: function() {
    return this._jsdomClientWidth || window.innerHeight;
  }
});
Object.defineProperty(window.document.documentElement, 'clientWidth', {
  get: function() {
    return this._jsdomClientWidth || window.innerWidth;
  }
});
