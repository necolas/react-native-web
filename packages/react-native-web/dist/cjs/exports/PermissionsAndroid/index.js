"use strict";

exports.__esModule = true;
exports.default = void 0;

var promiseMock = function promiseMock() {
  return Promise.resolve(false);
};

var _default = {
  PERMISSIONS: {},
  RESULTS: {},
  checkPermission: promiseMock,
  check: promiseMock,
  requestPermission: promiseMock,
  request: promiseMock,
  requestMultiple: promiseMock
};
exports.default = _default;
module.exports = exports.default;