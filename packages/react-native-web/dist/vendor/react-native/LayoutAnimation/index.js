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

import Platform from '../../../exports/Platform';
import UIManager from '../../../exports/UIManager';

var __DEV__ = process.env.NODE_ENV !== 'production';

function configureNext(config, onAnimationDidEnd) {
  if (!Platform.isTesting) {
    UIManager.configureNextLayoutAnimation(config, onAnimationDidEnd !== null && onAnimationDidEnd !== void 0 ? onAnimationDidEnd : function () {}, function () {}
    /* unused onError */
    );
  }
}

function create(duration, type, property) {
  return {
    duration: duration,
    create: {
      type: type,
      property: property
    },
    update: {
      type: type
    },
    delete: {
      type: type,
      property: property
    }
  };
}

var Presets = {
  easeInEaseOut: create(300, 'easeInEaseOut', 'opacity'),
  linear: create(500, 'linear', 'opacity'),
  spring: {
    duration: 700,
    create: {
      type: 'linear',
      property: 'opacity'
    },
    update: {
      type: 'spring',
      springDamping: 0.4
    },
    delete: {
      type: 'linear',
      property: 'opacity'
    }
  }
};
/**
 * Automatically animates views to their new positions when the
 * next layout happens.
 *
 * A common way to use this API is to call it before calling `setState`.
 *
 * Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:
 *
 *     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
 */

var LayoutAnimation = {
  /**
   * Schedules an animation to happen on the next layout.
   *
   * @param config Specifies animation properties:
   *
   *   - `duration` in milliseconds
   *   - `create`, `AnimationConfig` for animating in new views
   *   - `update`, `AnimationConfig` for animating views that have been updated
   *
   * @param onAnimationDidEnd Called when the animation finished.
   * Only supported on iOS.
   * @param onError Called on error. Only supported on iOS.
   */
  configureNext: configureNext,

  /**
   * Helper for creating a config for `configureNext`.
   */
  create: create,
  Types: Object.freeze({
    spring: 'spring',
    linear: 'linear',
    easeInEaseOut: 'easeInEaseOut',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    keyboard: 'keyboard'
  }),
  Properties: Object.freeze({
    opacity: 'opacity',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    scaleXY: 'scaleXY'
  }),
  checkConfig: function checkConfig() {
    console.error('LayoutAnimation.checkConfig(...) has been disabled.');
  },
  Presets: Presets,
  easeInEaseOut: configureNext.bind(null, Presets.easeInEaseOut),
  linear: configureNext.bind(null, Presets.linear),
  spring: configureNext.bind(null, Presets.spring)
};
export default LayoutAnimation;