import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import StyleSheet from '../StyleSheet';
import Animated from '../Animated';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';

export default class AlertOverlay extends Component {
  static propTypes = {
    Alert: PropTypes.node,
    animatedValue: PropTypes.object,
    buttons: PropTypes.array,
    onClose: PropTypes.func,
    options: PropTypes.array
  };

  render() {
    const { Alert, ...others } = this.props;

    others.buttons = this.getOverridenButtons();

    return (
      <TouchableWithoutFeedback onPress={this._onClickOut}>
        <View style={styles.container}>
          <Animated.View style={[styles.overlay, this.getAnimatedStyles()]}>
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
    Animated.timing(this.props.animatedValue, {
      toValue: 1,
      duration: 200
    }).start();
  }

  close() {
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

  _onClickOut = e => {
    if (this.props.options.cancelable) {
      this.props.options.onDismiss();
      this.close();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    cursor: 'default'
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
