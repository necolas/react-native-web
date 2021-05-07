"use strict";

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Share = /*#__PURE__*/function () {
  function Share() {}

  Share.share = function share(content, options) {
    if (options === void 0) {
      options = {};
    }

    (0, _invariant.default)(typeof content === 'object' && content !== null, 'Content to share must be a valid object');
    (0, _invariant.default)(typeof content.url === 'string' || typeof content.message === 'string', 'At least one of URL and message is required');
    (0, _invariant.default)(typeof options === 'object' && options !== null, 'Options must be a valid object');
    (0, _invariant.default)(!content.title || typeof content.title === 'string', 'Invalid title: title should be a string.');

    if (window.navigator.share !== undefined) {
      return window.navigator.share({
        title: content.title,
        text: content.message,
        url: content.url
      });
    } else {
      return Promise.reject(new Error('Share is not supported in this browser'));
    }
  }
  /**
   * The content was successfully shared.
   */
  ;

  _createClass(Share, null, [{
    key: "sharedAction",
    get: function get() {
      return 'sharedAction';
    }
    /**
     * The dialog has been dismissed.
     * @platform ios
     */

  }, {
    key: "dismissedAction",
    get: function get() {
      return 'dismissedAction';
    }
  }]);

  return Share;
}();

var _default = Share;
exports.default = _default;
module.exports = exports.default;