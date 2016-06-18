/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Easing
 * 
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _bezier = require('./bezier');

/**
 * This class implements common easing functions. The math is pretty obscure,
 * but this cool website has nice visual illustrations of what they represent:
 * http://xaedes.de/dev/transitions/
 */

var Easing = function () {
  function Easing() {
    _classCallCheck(this, Easing);
  }

  _createClass(Easing, null, [{
    key: 'step0',
    value: function step0(n) {
      return n > 0 ? 1 : 0;
    }
  }, {
    key: 'step1',
    value: function step1(n) {
      return n >= 1 ? 1 : 0;
    }
  }, {
    key: 'linear',
    value: function linear(t) {
      return t;
    }
  }, {
    key: 'ease',
    value: function ease(t) {
      return _ease(t);
    }
  }, {
    key: 'quad',
    value: function quad(t) {
      return t * t;
    }
  }, {
    key: 'cubic',
    value: function cubic(t) {
      return t * t * t;
    }
  }, {
    key: 'poly',
    value: function poly(n) {
      return function (t) {
        return Math.pow(t, n);
      };
    }
  }, {
    key: 'sin',
    value: function sin(t) {
      return 1 - Math.cos(t * Math.PI / 2);
    }
  }, {
    key: 'circle',
    value: function circle(t) {
      return 1 - Math.sqrt(1 - t * t);
    }
  }, {
    key: 'exp',
    value: function exp(t) {
      return Math.pow(2, 10 * (t - 1));
    }

    /**
     * A simple elastic interaction, similar to a spring.  Default bounciness
     * is 1, which overshoots a little bit once.  0 bounciness doesn't overshoot
     * at all, and bounciness of N > 1 will overshoot about N times.
     *
     * Wolfram Plots:
     *
     *   http://tiny.cc/elastic_b_1 (default bounciness = 1)
     *   http://tiny.cc/elastic_b_3 (bounciness = 3)
     */

  }, {
    key: 'elastic',
    value: function elastic() {
      var bounciness = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var p = bounciness * Math.PI;
      return function (t) {
        return 1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p);
      };
    }
  }, {
    key: 'back',
    value: function back(s) {
      if (s === undefined) {
        s = 1.70158;
      }
      return function (t) {
        return t * t * ((s + 1) * t - s);
      };
    }
  }, {
    key: 'bounce',
    value: function bounce(t) {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      }

      if (t < 2 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
      }

      if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
      }

      t -= 2.625 / 2.75;
      return 7.5625 * t * t + 0.984375;
    }
  }, {
    key: 'bezier',
    value: function bezier(x1, y1, x2, y2, epsilon) {
      if (epsilon === undefined) {
        // epsilon determines the precision of the solved values
        // a good approximation is:
        var duration = 500; // duration of animation in milliseconds.
        epsilon = 1000 / 60 / duration / 4;
      }

      return _bezier(x1, y1, x2, y2, epsilon);
    }
  }, {
    key: 'in',
    value: function _in(easing) {
      return easing;
    }

    /**
     * Runs an easing function backwards.
     */

  }, {
    key: 'out',
    value: function out(easing) {
      return function (t) {
        return 1 - easing(1 - t);
      };
    }

    /**
     * Makes any easing function symmetrical.
     */

  }, {
    key: 'inOut',
    value: function inOut(easing) {
      return function (t) {
        if (t < 0.5) {
          return easing(t * 2) / 2;
        }
        return 1 - easing((1 - t) * 2) / 2;
      };
    }
  }]);

  return Easing;
}();

var _ease = Easing.bezier(0.42, 0, 1, 1);

module.exports = Easing;