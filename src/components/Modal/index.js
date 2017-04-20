import Animated from '../../apis/Animated';
import Dimensions from '../../apis/Dimensions';
import StyleSheet from '../../apis/StyleSheet';
import React, { Component, PropTypes } from 'react';

const shortAnimTime = 200;

class Modal extends Component {
  static displayName = 'Modal';

  static propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    children: PropTypes.any,
    onShow: PropTypes.func,
    transparent: PropTypes.bool,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    animationType: 'none',
    visible: true,
  };

  constructor(props) {
    super(props);
    const { height } = Dimensions.get('window');
    this.state = {
      visible: false,
      positionY: new Animated.Value(height),
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    if (this.state.visible) return;

    const { onShow, animationType } = this.props;
    if (animationType === 'slide') {
      this.setState({ visible: true }, () =>
        Animated.timing(this.state.positionY, {
          toValue: 0,
          duration: shortAnimTime,
        })
        .start(() => onShow && onShow()),
      );
    } else if (animationType === 'fade') {
      this.setState({ visible: true }, () =>
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: shortAnimTime,
        })
        .start(() => onShow && onShow())
      );
    }
  }

  hide() {
    if (!this.state.visible) return;

    const { animationType } = this.props;
    if (animationType === 'slide') {
      const { height } = Dimensions.get('window');
      Animated.timing(this.state.positionY, {
        toValue: +height,
        duration: shortAnimTime,
      })
      .start(() => this.setState({ visible: false }));
    } else if (animationType === 'fade') {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: shortAnimTime,
      })
      .start(() => this.setState({ visible: false }));
    }
  }

  render() {
    const { animationType, transparent, visible } = this.props;
    if (
      (animationType !== 'none' && !this.state.visible) ||
      (animationType === 'none' && !visible)
    ) {
      return null;
    }

    let modalStyles = {};
    if (animationType === 'slide') {
      modalStyles = { transform: [{ translateY: this.state.positionY }]};
    } else if (animationType === 'fade') {
      modalStyles = { opacity: this.state.opacity };
    }
    if (transparent) {
      modalStyles.backgroundColor = 'transparent';
    }
    return (
      <Animated.View style={[styles.modal, modalStyles]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'white',
  },
});

module.exports = Modal;
