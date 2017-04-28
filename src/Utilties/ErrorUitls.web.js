/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @providesModule ReactErrorUtils
 */

/* eslint global-strict:0 */
(function(global) {
  var ErrorUtils = {
    _inGuard: 0,
    _globalHandler: null,
    setGlobalHandler: function(fun) {
      ErrorUtils._globalHandler = fun;
    },
    reportError: function(error) {
      ErrorUtils._globalHandler && ErrorUtils._globalHandler(error);
    },
    reportFatalError: function(error) {
      ErrorUtils._globalHandler && ErrorUtils._globalHandler(error, true);
    },
    applyWithGuard: function(fun, context, args) {
      try {
        ErrorUtils._inGuard++;
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        ErrorUtils._inGuard--;
      }
    },
    applyWithGuardIfNeeded: function(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }
    },
    inGuard: function() {
      return ErrorUtils._inGuard;
    },
    guard: function(fun, name, context) {
      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }
      name = name || fun.name || '<generated guard>';
      function guarded() {
        return (
          ErrorUtils.applyWithGuard(
            fun,
            context || this,
            arguments,
            null,
            name
          )
        );
      }

      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;

  /**
   * This is the error handler that is called when we encounter an exception
   * when loading a module.
   */
  function setupErrorGuard() {
    var onError = function(e) {
      global.console.error(
        'Error: ' +
        '\n stack: ' + e.stack +
        '\n line: ' + e.line +
        '\n message: ' + e.message,
        e
      );
    };
    global.ErrorUtils.setGlobalHandler(onError);
  }

  setupErrorGuard();
})(window);

module.exports = ErrorUtils;
