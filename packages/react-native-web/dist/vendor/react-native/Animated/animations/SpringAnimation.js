/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import AnimatedValue from '../nodes/AnimatedValue';
import AnimatedValueXY from '../nodes/AnimatedValueXY';
import AnimatedInterpolation from '../nodes/AnimatedInterpolation';
import Animation from './Animation';
import SpringConfig from '../SpringConfig';
import invariant from 'fbjs/lib/invariant';
import { shouldUseNativeDriver } from '../NativeAnimatedHelper';

var SpringAnimation = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(SpringAnimation, _Animation);

  function SpringAnimation(config) {
    var _config$overshootClam, _config$restDisplacem, _config$restSpeedThre, _config$velocity, _config$velocity2, _config$delay, _config$isInteraction, _config$iterations;

    var _this;

    _this = _Animation.call(this) || this;
    _this._overshootClamping = (_config$overshootClam = config.overshootClamping) !== null && _config$overshootClam !== void 0 ? _config$overshootClam : false;
    _this._restDisplacementThreshold = (_config$restDisplacem = config.restDisplacementThreshold) !== null && _config$restDisplacem !== void 0 ? _config$restDisplacem : 0.001;
    _this._restSpeedThreshold = (_config$restSpeedThre = config.restSpeedThreshold) !== null && _config$restSpeedThre !== void 0 ? _config$restSpeedThre : 0.001;
    _this._initialVelocity = (_config$velocity = config.velocity) !== null && _config$velocity !== void 0 ? _config$velocity : 0;
    _this._lastVelocity = (_config$velocity2 = config.velocity) !== null && _config$velocity2 !== void 0 ? _config$velocity2 : 0;
    _this._toValue = config.toValue;
    _this._delay = (_config$delay = config.delay) !== null && _config$delay !== void 0 ? _config$delay : 0;
    _this._useNativeDriver = shouldUseNativeDriver(config);
    _this.__isInteraction = (_config$isInteraction = config.isInteraction) !== null && _config$isInteraction !== void 0 ? _config$isInteraction : !_this._useNativeDriver;
    _this.__iterations = (_config$iterations = config.iterations) !== null && _config$iterations !== void 0 ? _config$iterations : 1;

    if (config.stiffness !== undefined || config.damping !== undefined || config.mass !== undefined) {
      var _config$stiffness, _config$damping, _config$mass;

      invariant(config.bounciness === undefined && config.speed === undefined && config.tension === undefined && config.friction === undefined, 'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one');
      _this._stiffness = (_config$stiffness = config.stiffness) !== null && _config$stiffness !== void 0 ? _config$stiffness : 100;
      _this._damping = (_config$damping = config.damping) !== null && _config$damping !== void 0 ? _config$damping : 10;
      _this._mass = (_config$mass = config.mass) !== null && _config$mass !== void 0 ? _config$mass : 1;
    } else if (config.bounciness !== undefined || config.speed !== undefined) {
      var _config$bounciness, _config$speed;

      // Convert the origami bounciness/speed values to stiffness/damping
      // We assume mass is 1.
      invariant(config.tension === undefined && config.friction === undefined && config.stiffness === undefined && config.damping === undefined && config.mass === undefined, 'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one');
      var springConfig = SpringConfig.fromBouncinessAndSpeed((_config$bounciness = config.bounciness) !== null && _config$bounciness !== void 0 ? _config$bounciness : 8, (_config$speed = config.speed) !== null && _config$speed !== void 0 ? _config$speed : 12);
      _this._stiffness = springConfig.stiffness;
      _this._damping = springConfig.damping;
      _this._mass = 1;
    } else {
      var _config$tension, _config$friction;

      // Convert the origami tension/friction values to stiffness/damping
      // We assume mass is 1.
      var _springConfig = SpringConfig.fromOrigamiTensionAndFriction((_config$tension = config.tension) !== null && _config$tension !== void 0 ? _config$tension : 40, (_config$friction = config.friction) !== null && _config$friction !== void 0 ? _config$friction : 7);

      _this._stiffness = _springConfig.stiffness;
      _this._damping = _springConfig.damping;
      _this._mass = 1;
    }

    invariant(_this._stiffness > 0, 'Stiffness value must be greater than 0');
    invariant(_this._damping > 0, 'Damping value must be greater than 0');
    invariant(_this._mass > 0, 'Mass value must be greater than 0');
    return _this;
  }

  var _proto = SpringAnimation.prototype;

  _proto.__getNativeAnimationConfig = function __getNativeAnimationConfig() {
    var _this$_initialVelocit;

    return {
      type: 'spring',
      overshootClamping: this._overshootClamping,
      restDisplacementThreshold: this._restDisplacementThreshold,
      restSpeedThreshold: this._restSpeedThreshold,
      stiffness: this._stiffness,
      damping: this._damping,
      mass: this._mass,
      initialVelocity: (_this$_initialVelocit = this._initialVelocity) !== null && _this$_initialVelocit !== void 0 ? _this$_initialVelocit : this._lastVelocity,
      toValue: this._toValue,
      iterations: this.__iterations
    };
  };

  _proto.start = function start(fromValue, onUpdate, onEnd, previousAnimation, animatedValue) {
    var _this2 = this;

    this.__active = true;
    this._startPosition = fromValue;
    this._lastPosition = this._startPosition;
    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;
    this._lastTime = Date.now();
    this._frameTime = 0.0;

    if (previousAnimation instanceof SpringAnimation) {
      var internalState = previousAnimation.getInternalState();
      this._lastPosition = internalState.lastPosition;
      this._lastVelocity = internalState.lastVelocity; // Set the initial velocity to the last velocity

      this._initialVelocity = this._lastVelocity;
      this._lastTime = internalState.lastTime;
    }

    var start = function start() {
      if (_this2._useNativeDriver) {
        _this2.__startNativeAnimation(animatedValue);
      } else {
        _this2.onUpdate();
      }
    }; //  If this._delay is more than 0, we start after the timeout.


    if (this._delay) {
      this._timeout = setTimeout(start, this._delay);
    } else {
      start();
    }
  };

  _proto.getInternalState = function getInternalState() {
    return {
      lastPosition: this._lastPosition,
      lastVelocity: this._lastVelocity,
      lastTime: this._lastTime
    };
  }
  /**
   * This spring model is based off of a damped harmonic oscillator
   * (https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator).
   *
   * We use the closed form of the second order differential equation:
   *
   * x'' + (2ζ⍵_0)x' + ⍵^2x = 0
   *
   * where
   *    ⍵_0 = √(k / m) (undamped angular frequency of the oscillator),
   *    ζ = c / 2√mk (damping ratio),
   *    c = damping constant
   *    k = stiffness
   *    m = mass
   *
   * The derivation of the closed form is described in detail here:
   * http://planetmath.org/sites/default/files/texpdf/39745.pdf
   *
   * This algorithm happens to match the algorithm used by CASpringAnimation,
   * a QuartzCore (iOS) API that creates spring animations.
   */
  ;

  _proto.onUpdate = function onUpdate() {
    // If for some reason we lost a lot of frames (e.g. process large payload or
    // stopped in the debugger), we only advance by 4 frames worth of
    // computation and will continue on the next frame. It's better to have it
    // running at faster speed than jumping to the end.
    var MAX_STEPS = 64;
    var now = Date.now();

    if (now > this._lastTime + MAX_STEPS) {
      now = this._lastTime + MAX_STEPS;
    }

    var deltaTime = (now - this._lastTime) / 1000;
    this._frameTime += deltaTime;
    var c = this._damping;
    var m = this._mass;
    var k = this._stiffness;
    var v0 = -this._initialVelocity;
    var zeta = c / (2 * Math.sqrt(k * m)); // damping ratio

    var omega0 = Math.sqrt(k / m); // undamped angular frequency of the oscillator (rad/ms)

    var omega1 = omega0 * Math.sqrt(1.0 - zeta * zeta); // exponential decay

    var x0 = this._toValue - this._startPosition; // calculate the oscillation from x0 = 1 to x = 0

    var position = 0.0;
    var velocity = 0.0;
    var t = this._frameTime;

    if (zeta < 1) {
      // Under damped
      var envelope = Math.exp(-zeta * omega0 * t);
      position = this._toValue - envelope * ((v0 + zeta * omega0 * x0) / omega1 * Math.sin(omega1 * t) + x0 * Math.cos(omega1 * t)); // This looks crazy -- it's actually just the derivative of the
      // oscillation function

      velocity = zeta * omega0 * envelope * (Math.sin(omega1 * t) * (v0 + zeta * omega0 * x0) / omega1 + x0 * Math.cos(omega1 * t)) - envelope * (Math.cos(omega1 * t) * (v0 + zeta * omega0 * x0) - omega1 * x0 * Math.sin(omega1 * t));
    } else {
      // Critically damped
      var _envelope = Math.exp(-omega0 * t);

      position = this._toValue - _envelope * (x0 + (v0 + omega0 * x0) * t);
      velocity = _envelope * (v0 * (t * omega0 - 1) + t * x0 * (omega0 * omega0));
    }

    this._lastTime = now;
    this._lastPosition = position;
    this._lastVelocity = velocity;

    this._onUpdate(position);

    if (!this.__active) {
      // a listener might have stopped us in _onUpdate
      return;
    } // Conditions for stopping the spring animation


    var isOvershooting = false;

    if (this._overshootClamping && this._stiffness !== 0) {
      if (this._startPosition < this._toValue) {
        isOvershooting = position > this._toValue;
      } else {
        isOvershooting = position < this._toValue;
      }
    }

    var isVelocity = Math.abs(velocity) <= this._restSpeedThreshold;

    var isDisplacement = true;

    if (this._stiffness !== 0) {
      isDisplacement = Math.abs(this._toValue - position) <= this._restDisplacementThreshold;
    }

    if (isOvershooting || isVelocity && isDisplacement) {
      if (this._stiffness !== 0) {
        // Ensure that we end up with a round value
        this._lastPosition = this._toValue;
        this._lastVelocity = 0;

        this._onUpdate(this._toValue);
      }

      this.__debouncedOnEnd({
        finished: true
      });

      return;
    }

    this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
  };

  _proto.stop = function stop() {
    _Animation.prototype.stop.call(this);

    this.__active = false;
    clearTimeout(this._timeout);
    global.cancelAnimationFrame(this._animationFrame);

    this.__debouncedOnEnd({
      finished: false
    });
  };

  return SpringAnimation;
}(Animation);

export default SpringAnimation;