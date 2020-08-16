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
  children?: any,

  animationType?: ?('none' | 'slide' | 'fade'),

  visible?: ?boolean,

  onShow?: ?() => void,
  onDismiss?: ?() => void
|};

function ModalAnimation(props: ModalAnimationProps) {
  const {
    children,
    animationType,
    visible,
    onShow,
    onDismiss
  } = props;

  const [isRendering, setIsRendering] = useState(false);

  const isAnimated = animationType && animationType !== 'none';

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
      style: getAnimationStyle(animationType, visible),
      onAnimationEnd: animationEndCallback,
      children
    }
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
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

const animatedSlideInStyles = [styles.container, styles.animatedIn, styles.slideIn];
const animatedSlideOutStyles = [styles.container, styles.animatedOut, styles.slideOut];

const animatedFadeInStyles = [styles.container, styles.animatedIn, styles.fadeIn];
const animatedFadeOutStyles = [styles.container, styles.animatedOut, styles.fadeOut];

export default ModalAnimation;
