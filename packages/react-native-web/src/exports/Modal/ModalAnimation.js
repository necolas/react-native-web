/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { useEffect, useState, useCallback, useMemo } from 'react';

import StyleSheet from '../StyleSheet';
import createElement from '../createElement';

import type { ModalAnimationProps } from './types';


const ANIMATION_DURATION = 300;

function getAnimationStyle(animationType, visible) {
  if (animationType === 'slide') {
    return [
      (visible ? styles.animatedIn : styles.animatedOut),
      (visible ? styles.slideIn : styles.slideOut)
    ];
  }

  if (animationType === 'fade') {
    return [
      (visible ? styles.animatedIn : styles.animatedOut),
      (visible ? styles.fadeIn : styles.fadeOut)
    ];
  }

  if (!visible) {
    return styles.hidden;
  }

  return null;
}

function ModalAnimation(props: ModalAnimationProps) {
  const {
    children,
    style,
    animated,
    animationType,
    visible,
    onShow,
    onDismiss
  } = props;

  const [isRendering, setIsRendering] = useState(false);

  // Resolve the "actual" animation type by checking the (somewhat deprecated)
  // animated prop against the animationType prop
  const computedAnimationType = useMemo(() => {
    if (!animationType) {
      if (animated) {
        return 'slide';
      } else {
        return 'none';
      }
    }

    return animationType;
  }, [animationType, animated]);

  const isAnimated = computedAnimationType !== 'none';

  const animationEndCallback = useCallback(() => {
    if (visible) {
      // If animation completed and we're visible,
      // fire off the onShow callback
      if (onShow) {
        onShow();
      }
    } else {
      // If animation completed and we're visible,
      // fire off the onDismiss callback and stop rendering
      setIsRendering(false);
      if (onDismiss) {
        onDismiss();
      }
    }
  }, [onDismiss, onShow, visible]);

  // If the `visible` flag is changing we want to set the rendering flag to true
  // before the animations ever will start
  useEffect(() =>  {
    if (visible) {
      setIsRendering(true);
    }

    if (!isAnimated) {
      // If !isAnimated we have to manually call `animationEndCallback` - if we
      // don't it will never get called
      animationEndCallback();
    }
  }, [isAnimated, visible, animationEndCallback]);

  if (!isRendering) {
    return null;
  }

  return createElement(
    'div',
    {
      style: [style, getAnimationStyle(animationType, visible)],
      onAnimationEnd: animationEndCallback,
      children
    }
  );
}

const styles = StyleSheet.create({
  animatedIn: {
    animationDuration: `${ANIMATION_DURATION}ms`,
    animationTimingFunction: 'ease-in'
  },
  animatedOut: {
    pointerEvents: 'none',
    animationDuration: `${ANIMATION_DURATION}ms`,
    animationTimingFunction: 'ease-out'
  },
  fadeIn: {
    opacity: 1,
    animationKeyframes: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    }
  },
  fadeOut: {
    opacity: 0,
    animationKeyframes: {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 }
    }
  },
  slideIn: {
    transform: [ { translateY: '0%' } ],
    animationKeyframes: {
      '0%': { transform: [ { translateY: '100%' } ] },
      '100%': { transform: [ { translateY: '0%' } ] }
    }
  },
  slideOut: {
    transform: [ { translateY: '100%' } ],
    animationKeyframes: {
      '0%': { transform: [ { translateY: '0%' } ] },
      '100%': { transform: [ { translateY: '100%' } ] }
    }
  },
  hidden: {
    display: 'none'
  }
});

export default ModalAnimation;
