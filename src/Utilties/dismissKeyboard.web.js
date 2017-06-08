/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactDismissKeyboard
 */
'use strict';

function dismissKeyboard() {
  document.activeElement.blur();
}

module.exports = dismissKeyboard;
