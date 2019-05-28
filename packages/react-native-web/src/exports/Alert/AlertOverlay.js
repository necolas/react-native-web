import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import StyleSheet from '../StyleSheet';
import Animated from '../Animated';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';

export default class AlertOverlay extends Component {
  static propTypes = {
    Alert: PropTypes.oneOfType([PropTypes.instanceOf(Component), PropTypes.func]),
    animatedValue: PropTypes.object,
    buttons: PropTypes.array,
    onClose: PropTypes.func,
    options: PropTypes.object
  };

  constructor() {
    super();
    this.bg = React.createRef();
  }

  render() {
    const { Alert, ...others } = this.props;

    others.buttons = this.getOverridenButtons();

    return (
      <TouchableWithoutFeedback onPressIn={this._onClickOut}>
        <View onWheel={this._preventBGScroll} style={styles.container}>
          <View accessible={true} data-focustrap="alert" />
          <Animated.View data-alert="bg" style={[styles.overlay, this.getAnimatedStyles()]}>
            <Alert {...others} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getAnimatedStyles() {
    if (!this.animatedStyles) {
      this.animatedStyles = {
        opacity: this.props.animatedValue,
        transform: [
          {
            scale: this.props.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 1]
            })
          }
        ]
      };
    }
    return this.animatedStyles;
  }

  componentDidMount() {
    this.setState({ inTransition: true });
    this.bg = document.querySelector('[data-alert=bg]');

    Animated.timing(this.props.animatedValue, {
      toValue: 1,
      duration: 200
    }).start();

    document.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('popstate', this._onURLChange);
  }

  close() {
    document.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('popstate', this._onURLChange);

    Animated.timing(this.props.animatedValue, {
      toValue: 0,
      duration: 200
    }).start(this.props.onClose);
  }

  getOverridenButtons() {
    if (!this.overridenButtons) {
      this.overridenButtons = this.props.buttons.map(b => ({
        text: b.text,
        type: b.style,
        onPress: e => {
          this.close();
          b.onPress(e);
        }
      }));
    }
    return this.overridenButtons;
  }

  _onKeyDown = e => {
    if (e.which === 27) {
      this.tryDismiss();
    }
  };

  _onClickOut = e => {
    if (e.target === this.bg) {
      this.tryDismiss();
    }
  };

  _onURLChange = () => {
    this.dismiss();
  };

  tryDismiss() {
    if (this.props.options.cancelable) {
      this.dismiss();
    }
  }

  dismiss() {
    this.props.options.onDismiss();
    this.close();
  }

  _preventBGScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('wheel');
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    cursor: 'default',
    userSelect: 'text'
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
