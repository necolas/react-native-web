"use strict";

exports.__esModule = true;
exports.default = renderApplication;
exports.getApplication = getApplication;

var _AppContainer = _interopRequireDefault(require("./AppContainer"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _render = _interopRequireWildcard(require("../render"));

var _styleResolver = _interopRequireDefault(require("../StyleSheet/styleResolver"));

var _react = _interopRequireDefault(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function renderApplication(RootComponent, WrapperComponent, callback, options) {
  var shouldHydrate = options.hydrate,
      initialProps = options.initialProps,
      rootTag = options.rootTag;
  var renderFn = shouldHydrate ? _render.hydrate : _render.default;
  (0, _invariant.default)(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);
  renderFn( /*#__PURE__*/_react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    rootTag: rootTag
  }, /*#__PURE__*/_react.default.createElement(RootComponent, initialProps)), rootTag, callback);
}

function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = /*#__PURE__*/_react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    rootTag: {}
  }, /*#__PURE__*/_react.default.createElement(RootComponent, initialProps)); // Don't escape CSS text


  var getStyleElement = function getStyleElement(props) {
    var sheet = _styleResolver.default.getStyleSheet();

    return /*#__PURE__*/_react.default.createElement("style", _extends({}, props, {
      dangerouslySetInnerHTML: {
        __html: sheet.textContent
      },
      id: sheet.id
    }));
  };

  return {
    element: element,
    getStyleElement: getStyleElement
  };
}