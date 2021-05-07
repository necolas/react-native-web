var promiseMock = function promiseMock() {
  return Promise.resolve(false);
};

export default {
  PERMISSIONS: {},
  RESULTS: {},
  checkPermission: promiseMock,
  check: promiseMock,
  requestPermission: promiseMock,
  request: promiseMock,
  requestMultiple: promiseMock
};