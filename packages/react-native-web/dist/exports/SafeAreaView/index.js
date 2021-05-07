function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import StyleSheet from '../StyleSheet';
import View from '../View';

var cssFunction = function () {
  if (canUseDOM && window.CSS && window.CSS.supports && window.CSS.supports('top: constant(safe-area-inset-top)')) {
    return 'constant';
  }

  return 'env';
}();

var SafeAreaView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var style = props.style,
      rest = _objectWithoutPropertiesLoose(props, ["style"]);

  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    ref: ref,
    style: StyleSheet.compose(styles.root, style)
  }));
});
SafeAreaView.displayName = 'SafeAreaView';
var styles = StyleSheet.create({
  root: {
    paddingTop: cssFunction + "(safe-area-inset-top)",
    paddingRight: cssFunction + "(safe-area-inset-right)",
    paddingBottom: cssFunction + "(safe-area-inset-bottom)",
    paddingLeft: cssFunction + "(safe-area-inset-left)"
  }
});
export default SafeAreaView;