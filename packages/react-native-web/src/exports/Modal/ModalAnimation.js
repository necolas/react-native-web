import React from 'react';

import Animated from '../Animated';
import Dimensions from '../Dimensions';
import Easing from '../Easing';
import type { ModalProps } from './types';

export default class ModalAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      animation: null,
      animationValue: new Animated.Value(0)
    }
  }

  _getAnimationType () {
    const {
      animated,
      animationType
    } = this.props;

    if (!animationType) {
      if (animated) {
        return 'slide';
      } else {
        return 'none';
      }
    }

    return animationType;
  }

  _isAnimated () {
    return this._getAnimationType() === 'none';
  }

  _animate ({ fromValue, toValue, duration = 300, easing, callback }) {
    const {
      animation,
      animationValue
    } = this.state;

    if (animation) {
      animation.stop();
    }

    if (typeof fromValue !== 'undefined') {
      animationValue.setValue(fromValue);
    }

    this.setState(
      {
        animation: Animated.timing(
          animationValue,
          {
            duration,
            toValue,
            easing
          }
        ),
      },
      () => {
        this.state.animation.start(callback);
      }
    );
  }

  _getAnimationStyle () {
    const {
      animationValue
    } = this.state;

    const animationType = this._getAnimationType()

    if (animationType === 'slide') {
      return [
        {
          transform: [
            {
              translateY: animationValue.interpolate(
                {
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get('window').height, 0],
                  extrapolate: 'clamp',
                }
              )
            },
          ],
        }
      ];
    }

    if (animationType === 'fade') {
      return [{ opacity: animationValue }];
    }

    return [];
  }

  _onShow = () => {
    const { onShow } = this.props;

    this.setState({ visible: true });

    const callback = () => {
      if (onShow) {
        onShow();
      }
    };

    if (this._isAnimated()) {
      callback();
    } else {
      this._animate(
        {
          fromValue: 0,
          toValue: 1,
          easing: Easing.out(Easing.poly(4)),
          callback
        }
      );
    }
  }

  _onDismiss = () => {
    const { onDismiss } = this.props;

    const animationType = this._getAnimationType();

    const callback = () => {
      this.setState({ visible: false });
      if (onDismiss) {
        onDismiss();
      }
    };

    if (this._isAnimated()) {
      callback();
    } else {
      this._animate(
        {
          fromValue: 1,
          toValue: 0,
          easing: Easing.in(Easing.poly(4)),
          callback
        }
      );
    }
  }

  componentDidUpdate(prevProps: ModalProps) {
    const { visible: wasVisible } = prevProps;
    const {
      visible
    } = this.props;

    if (visible !== wasVisible) {
      if (visible) {
        this._onShow();
      } else {
        this._onDismiss();
      }
    }
  }

  render () {
    const {
      children,
      style
    } = this.props;

    const {
      visible
    } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Animated.View style={[...style, ...this._getAnimationStyle()]}>
        {children}
      </Animated.View>
    );
  }
}
