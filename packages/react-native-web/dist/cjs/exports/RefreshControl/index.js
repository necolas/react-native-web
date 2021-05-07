"use strict";

exports.__esModule = true;
exports.default = void 0;

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function RefreshControl(props) {
  var colors = props.colors,
      enabled = props.enabled,
      onRefresh = props.onRefresh,
      progressBackgroundColor = props.progressBackgroundColor,
      progressViewOffset = props.progressViewOffset,
      refreshing = props.refreshing,
      size = props.size,
      tintColor = props.tintColor,
      title = props.title,
      titleColor = props.titleColor,
      rest = _objectWithoutPropertiesLoose(props, ["colors", "enabled", "onRefresh", "progressBackgroundColor", "progressViewOffset", "refreshing", "size", "tintColor", "title", "titleColor"]);

  return /*#__PURE__*/_react.default.createElement(_View.default, rest);
}

var _default = RefreshControl;
exports.default = _default;
module.exports = exports.default;