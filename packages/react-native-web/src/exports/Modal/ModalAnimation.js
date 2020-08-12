/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import Animated from '../Animated';
import Dimensions from '../Dimensions';
import Easing from '../Easing';

function getAnimationStyle(animationType, animationValue) {
  if (animationType === 'slide') {
    return [
      {
        transform: [
          {
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [Dimensions.get('window').height, 0],
              extrapolate: 'clamp'
            })
          }
        ]
      }
    ];
  }

  if (animationType === 'fade') {
    return [{ opacity: animationValue }];
  }

  return [];
}

function ModalAnimation(props) {
  const {
    children,
    style,
    animated,
    animationType,
    onShow,
    onDismiss,
    visible
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

  // Wrap the callbacks so we don't have to worry about them being null
  const onShowCallback = useCallback(() => { if (onShow) { onShow(); } }, [onShow]);
  const onDismissCallback = useCallback(() => { if (onDismiss) { onDismiss(); } }, [onDismiss])

  // Activate the `Animated` value to start off the animation happening
  const animationRef = useRef({
    animation: null,
    animationValue: new Animated.Value(0)
  });
  const animate = useCallback(({ fromValue, toValue, duration = 300, easing, callback }) => {
    if (animationRef.current.animation) {
      animationRef.current.animation.stop();
    }

    if (typeof fromValue !== 'undefined') {
      animationRef.current.animationValue.setValue(fromValue);
    }

    animationRef.current.animation = Animated.timing(
      animationRef.current.animationValue,
      {
        duration,
        toValue,
        easing
      }
    );

    animationRef.current.animation.start(callback);
  }, []);

  // Function to fire off the animations that show the modal.
  // Sets the rendering flag BEFORE the animation has occurred.
  const showModal = useCallback(() => {
    setIsRendering(true);

    if (!isAnimated) {
      onShowCallback();
    } else {
      animate({
        fromValue: 0,
        toValue: 1,
        easing: Easing.out(Easing.poly(4)),
        callback: () => {
          onShowCallback();
        }
      });
    }
  }, [animate, isAnimated, onShowCallback]);

  // Function to fire off the animations that dismiss the modal.
  // Sets the rendering flag AFTER the animation has occurred.
  const dismissModal = useCallback(() => {
    if (!isAnimated) {
      onDismissCallback();
      setIsRendering(false);
    } else {
      animate({
        fromValue: 1,
        toValue: 0,
        easing: Easing.in(Easing.poly(4)),
        callback: () => {
          onDismissCallback();
          setIsRendering(false);
        }
      });
    }
  }, [animate, isAnimated, onDismissCallback]);

  // If the `visible` flag is changing we want to kick off the showing / dismissal
  // of the modal - we do this here so all the other effects are isolated.
  const previousVisibility = useRef(false);
  useEffect(() =>  {
    if (previousVisibility.current !== visible) {
      previousVisibility.current = visible;

      if (visible) {
        showModal();
      } else {
        dismissModal();
      }
    }
  }, [dismissModal, showModal, visible]);

  if (!isRendering) {
    return null;
  }

  const animationStyle = getAnimationStyle(computedAnimationType, animationRef.current.animationValue);

  return (
    <Animated.View style={[...style, ...animationStyle]}>{children}</Animated.View>
  );
}

export default ModalAnimation;
