'use strict';

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var Platform = {
  OS: 'web',
  userAgent: _ExecutionEnvironment.canUseDOM ? window.navigator.userAgent : '',
  select: function select(obj) {
    return obj.web;
  }
};

module.exports = Platform;