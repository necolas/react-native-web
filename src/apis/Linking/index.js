export default {
  addEventListener() {},
  removeEventListener() {},

  openURL(url) { window.open(url); },
  canOpenUrl() { return true; },
  getInitialUrl() { return ''; }
};
