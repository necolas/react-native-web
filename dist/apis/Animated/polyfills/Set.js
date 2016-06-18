"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function SetPolyfill() {
  this._cache = [];
}

SetPolyfill.prototype.add = function (e) {
  if (this._cache.indexOf(e) === -1) {
    this._cache.push(e);
  }
};

SetPolyfill.prototype.forEach = function (cb) {
  this._cache.forEach(cb);
};

exports.default = SetPolyfill;