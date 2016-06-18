'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listeners = {};
var eventTypes = ['change'];

var AppState = function () {
  function AppState() {
    _classCallCheck(this, AppState);
  }

  _createClass(AppState, null, [{
    key: 'addEventListener',
    value: function addEventListener(type, handler) {
      listeners[handler] = function () {
        return handler(AppState.currentState);
      };
      (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      document.addEventListener('visibilitychange', listeners[handler], false);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, handler) {
      (0, _invariant2.default)(eventTypes.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type);
      document.removeEventListener('visibilitychange', listeners[handler], false);
      delete listeners[handler];
    }
  }, {
    key: 'currentState',
    get: function get() {
      switch (document.visibilityState) {
        case 'hidden':
        case 'prerender':
        case 'unloaded':
          return 'background';
        default:
          return 'active';
      }
    }
  }]);

  return AppState;
}();

module.exports = AppState;