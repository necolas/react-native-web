/* eslint-env jasmine, jest */

// JSDOM doesn't implement ResizeObserver
class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserver;
