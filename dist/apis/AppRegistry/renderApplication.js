'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderApplication;
exports.prerenderApplication = prerenderApplication;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _ReactNativeApp = require('./ReactNativeApp');

var _ReactNativeApp2 = _interopRequireDefault(_ReactNativeApp);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */

var renderStyleSheetToString = function renderStyleSheetToString() {
  return _StyleSheet2.default.renderToString();
};
var styleAsElement = function styleAsElement(style) {
  return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: style }, id: _StyleSheet2.default.elementId });
};
var styleAsTagString = function styleAsTagString(style) {
  return '<style id="' + _StyleSheet2.default.elementId + '">' + style + '</style>';
};

function renderApplication(RootComponent, initialProps, rootTag) {
  (0, _invariant2.default)(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  // insert style sheet if needed
  var styleElement = document.getElementById(_StyleSheet2.default.elementId);
  if (!styleElement) {
    rootTag.insertAdjacentHTML('beforebegin', styleAsTagString(renderStyleSheetToString()));
  }

  var component = _react2.default.createElement(_ReactNativeApp2.default, {
    initialProps: initialProps,
    rootComponent: RootComponent,
    rootTag: rootTag
  });
  _reactDom2.default.render(component, rootTag);
}

function prerenderApplication(RootComponent, initialProps) {
  var component = _react2.default.createElement(_ReactNativeApp2.default, {
    initialProps: initialProps,
    rootComponent: RootComponent
  });
  var html = _server2.default.renderToString(component);
  var style = renderStyleSheetToString();
  var styleElement = styleAsElement(style);
  return { html: html, style: style, styleElement: styleElement };
}