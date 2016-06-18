'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                   * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

var _AnimatedImplementation = require('./AnimatedImplementation');

var _AnimatedImplementation2 = _interopRequireDefault(_AnimatedImplementation);

var _Image = require('../../components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Text = require('../../components/Text');

var _Text2 = _interopRequireDefault(_Text);

var _View = require('../../components/View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _extends({}, _AnimatedImplementation2.default, {
  View: _AnimatedImplementation2.default.createAnimatedComponent(_View2.default),
  Text: _AnimatedImplementation2.default.createAnimatedComponent(_Text2.default),
  Image: _AnimatedImplementation2.default.createAnimatedComponent(_Image2.default)
});