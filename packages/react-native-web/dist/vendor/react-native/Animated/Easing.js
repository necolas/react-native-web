/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

import _bezier from './bezier';

var _ease;
/**
 * The `Easing` module implements common easing functions. This module is used
 * by [Animate.timing()](docs/animate.html#timing) to convey physically
 * believable motion in animations.
 *
 * You can find a visualization of some common easing functions at
 * http://easings.net/
 *
 * ### Predefined animations
 *
 * The `Easing` module provides several predefined animations through the
 * following methods:
 *
 * - [`back`](docs/easing.html#back) provides a simple animation where the
 *   object goes slightly back before moving forward
 * - [`bounce`](docs/easing.html#bounce) provides a bouncing animation
 * - [`ease`](docs/easing.html#ease) provides a simple inertial animation
 * - [`elastic`](docs/easing.html#elastic) provides a simple spring interaction
 *
 * ### Standard functions
 *
 * Three standard easing functions are provided:
 *
 * - [`linear`](docs/easing.html#linear)
 * - [`quad`](docs/easing.html#quad)
 * - [`cubic`](docs/easing.html#cubic)
 *
 * The [`poly`](docs/easing.html#poly) function can be used to implement
 * quartic, quintic, and other higher power functions.
 *
 * ### Additional functions
 *
 * Additional mathematical functions are provided by the following methods:
 *
 * - [`bezier`](docs/easing.html#bezier) provides a cubic bezier curve
 * - [`circle`](docs/easing.html#circle) provides a circular function
 * - [`sin`](docs/easing.html#sin) provides a sinusoidal function
 * - [`exp`](docs/easing.html#exp) provides an exponential function
 *
 * The following helpers are used to modify other easing functions.
 *
 * - [`in`](docs/easing.html#in) runs an easing function forwards
 * - [`inOut`](docs/easing.html#inout) makes any easing function symmetrical
 * - [`out`](docs/easing.html#out) runs an easing function backwards
 */


var Easing = /*#__PURE__*/function () {
  function Easing() {}

  /**
   * A stepping function, returns 1 for any positive value of `n`.
   */
  Easing.step0 = function step0(n) {
    return n > 0 ? 1 : 0;
  }
  /**
   * A stepping function, returns 1 if `n` is greater than or equal to 1.
   */
  ;

  Easing.step1 = function step1(n) {
    return n >= 1 ? 1 : 0;
  }
  /**
   * A linear function, `f(t) = t`. Position correlates to elapsed time one to
   * one.
   *
   * http://cubic-bezier.com/#0,0,1,1
   */
  ;

  Easing.linear = function linear(t) {
    return t;
  }
  /**
   * A simple inertial interaction, similar to an object slowly accelerating to
   * speed.
   *
   * http://cubic-bezier.com/#.42,0,1,1
   */
  ;

  Easing.ease = function ease(t) {
    if (!_ease) {
      _ease = Easing.bezier(0.42, 0, 1, 1);
    }

    return _ease(t);
  }
  /**
   * A quadratic function, `f(t) = t * t`. Position equals the square of elapsed
   * time.
   *
   * http://easings.net/#easeInQuad
   */
  ;

  Easing.quad = function quad(t) {
    return t * t;
  }
  /**
   * A cubic function, `f(t) = t * t * t`. Position equals the cube of elapsed
   * time.
   *
   * http://easings.net/#easeInCubic
   */
  ;

  Easing.cubic = function cubic(t) {
    return t * t * t;
  }
  /**
   * A power function. Position is equal to the Nth power of elapsed time.
   *
   * n = 4: http://easings.net/#easeInQuart
   * n = 5: http://easings.net/#easeInQuint
   */
  ;

  Easing.poly = function poly(n) {
    return function (t) {
      return Math.pow(t, n);
    };
  }
  /**
   * A sinusoidal function.
   *
   * http://easings.net/#easeInSine
   */
  ;

  Easing.sin = function sin(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  }
  /**
   * A circular function.
   *
   * http://easings.net/#easeInCirc
   */
  ;

  Easing.circle = function circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  /**
   * An exponential function.
   *
   * http://easings.net/#easeInExpo
   */
  ;

  Easing.exp = function exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  /**
   * A simple elastic interaction, similar to a spring oscillating back and
   * forth.
   *
   * Default bounciness is 1, which overshoots a little bit once. 0 bounciness
   * doesn't overshoot at all, and bounciness of N > 1 will overshoot about N
   * times.
   *
   * http://easings.net/#easeInElastic
   */
  ;

  Easing.elastic = function elastic(bounciness) {
    if (bounciness === void 0) {
      bounciness = 1;
    }

    var p = bounciness * Math.PI;
    return function (t) {
      return 1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p);
    };
  }
  /**
   * Use with `Animated.parallel()` to create a simple effect where the object
   * animates back slightly as the animation starts.
   *
   * Wolfram Plot:
   *
   * - http://tiny.cc/back_default (s = 1.70158, default)
   */
  ;

  Easing.back = function back(s) {
    if (s === void 0) {
      s = 1.70158;
    }

    return function (t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  /**
   * Provides a simple bouncing effect.
   *
   * http://easings.net/#easeInBounce
   */
  ;

  Easing.bounce = function bounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    }

    if (t < 2 / 2.75) {
      var _t = t - 1.5 / 2.75;

      return 7.5625 * _t * _t + 0.75;
    }

    if (t < 2.5 / 2.75) {
      var _t2 = t - 2.25 / 2.75;

      return 7.5625 * _t2 * _t2 + 0.9375;
    }

    var t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  }
  /**
   * Provides a cubic bezier curve, equivalent to CSS Transitions'
   * `transition-timing-function`.
   *
   * A useful tool to visualize cubic bezier curves can be found at
   * http://cubic-bezier.com/
   */
  ;

  Easing.bezier = function bezier(x1, y1, x2, y2) {
    return _bezier(x1, y1, x2, y2);
  }
  /**
   * Runs an easing function forwards.
   */
  ;

  Easing.in = function _in(easing) {
    return easing;
  }
  /**
   * Runs an easing function backwards.
   */
  ;

  Easing.out = function out(easing) {
    return function (t) {
      return 1 - easing(1 - t);
    };
  }
  /**
   * Makes any easing function symmetrical. The easing function will run
   * forwards for half of the duration, then backwards for the rest of the
   * duration.
   */
  ;

  Easing.inOut = function inOut(easing) {
    return function (t) {
      if (t < 0.5) {
        return easing(t * 2) / 2;
      }

      return 1 - easing((1 - t) * 2) / 2;
    };
  };

  return Easing;
}();

export default Easing;