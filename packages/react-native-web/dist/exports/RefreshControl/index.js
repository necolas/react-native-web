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
import View from '../View';
import React from 'react';

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

  return /*#__PURE__*/React.createElement(View, rest);
}

export default RefreshControl;