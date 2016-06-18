'use strict';

var _TextInputState = require('../../components/TextInput/TextInputState');

var _TextInputState2 = _interopRequireDefault(_TextInputState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dismissKeyboard = function dismissKeyboard() {
  _TextInputState2.default.blurTextInput(_TextInputState2.default.currentlyFocusedField());
};

module.exports = dismissKeyboard;