/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { useEffect, useCallback, useState, useRef } from 'react';
import StyleSheet from '../StyleSheet';
import createElement from '../createElement';

const ANIMATION_DURATION = 300;

function getAnimationStyle(animationType, visible) {
  if (animationType === 'slide') {
    return visible ? animatedSlideInStyles : animatedSlideOutStyles;
  }
  if (animationType === 'fade') {
    return visible ? animatedFadeInStyles : animatedFadeOutStyles;
  }
  return visible ? styles.container : styles.hidden;
}

export type ModalAnimationProps = {|
  animationType?: ?('none' | 'slide' | 'fade'),
  children?: any,
  onDismiss?: ?() => void,
  onShow?: ?() => void,
  visible?: ?boolean
|};

function ModalAnimation(props: ModalAnimationProps) {
  const { animationType, children, onDismiss, onShow, visible } = props;

  const [isRendering, setIsRendering] = useState(false);
  const wasVisible = useRef(false);

  const isAnimated = animationType && animationType !== 'none';

  const animationEndCallback = useCallback(
    (e: any) => {
      if (e && e.currentTarget !== e.target) {
        // If the event was generated for something NOT this element we
        // should ignore it as it's not relevant to us
        return;
      }

      if (visible) {
        if (onShow) {
          onShow();
        }
      } else {
        setIsRendering(false);
        if (onDismiss) {
          onDismiss();
        }
      }
    },
    [onDismiss, onShow, visible]
  );

  useEffect(() => {
    if (visible) {
      setIsRendering(true);
    }
    if (visible !== wasVisible.current && !isAnimated) {
      // Manually call `animationEndCallback` if no animation is used
      animationEndCallback();
    }
    wasVisible.current = visible;
  }, [isAnimated, visible, animationEndCallback]);

  return isRendering || visible
    ? createElement('div', {
        style: isRendering ? getAnimationStyle(animationType, visible) : styles.hidden,
        onAnimationEnd: animationEndCallback,
        children
      })
    : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999
  },
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
    transform: [{ translateY: '0%' }],
    animationKeyframes: {
      '0%': { transform: [{ translateY: '100%' }] },
      '100%': { transform: [{ translateY: '0%' }] }
    }
  },
  slideOut: {
    transform: [{ translateY: '100%' }],
    animationKeyframes: {
      '0%': { transform: [{ translateY: '0%' }] },
      '100%': { transform: [{ translateY: '100%' }] }
    }
  },
  hidden: {
    opacity: 0
  }
});

const animatedSlideInStyles = [styles.container, styles.animatedIn, styles.slideIn];
const animatedSlideOutStyles = [styles.container, styles.animatedOut, styles.slideOut];
const animatedFadeInStyles = [styles.container, styles.animatedIn, styles.fadeIn];
const animatedFadeOutStyles = [styles.container, styles.animatedOut, styles.fadeOut];

export default ModalAnimation;
