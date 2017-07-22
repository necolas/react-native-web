import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import View from '../../components/View';
import Text from '../../components/Text';
import TouchableHighlight from '../../components/Touchable/TouchableHighlight';

let instance;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container: {
    overflow: 'hidden',
    backgroundColor: '#f8f8f8'
  },
  textContainer: {
    padding: 20,
    justifyContent: 'space-around'
  },
  title: {
    color: '#2b3137',
    fontSize: 17,
    fontWeight: '600'
  },
  message: {
    color: '#2b3137',
    marginTop: 4,
    fontSize: 14,
    maxWidth: 300,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flex: 1,
    paddingRight: 14,
    paddingBottom: 6,
  },
  buttonContainerMulti: { },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  buttonSpacer: {
  },
  buttonSpacerMulti: {
  },
  buttonLabel: {
    color: '#4b8ffe',
    fontSize: 14
  }
});

class AlertViewClass extends React.Component {

  state={ visible: false };

  onButtonPress = (onPress) => () => {
    this.setState({ visible: false });
    if (onPress) {
      onPress();
    }
  };

  _handleCancel = () => {
    const { options } = this.state;
    if (options && options.cancelable) {
      this.onButtonPress()();
    }
  };

  _addButtonRef = index => (ref) => {
    this[`button_${index}`] = ref;
  };

  componentDidUpdate() {
    if (this.state.visible) {
      this.button_0.focus();
    }
  }

  render() {
    const { visible, message, title, buttons } = this.state;
    if (!visible) {
      return null;
    }
    const isMultiButton = buttons.length > 2;
    return (
      <View style={styles.wrapper}>
        <View
          onClick={this._handleCancel}
          style={styles.background}
        />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={styles.title}
            >
              {title}
            </Text>
            <Text
              style={styles.message}
            >
              {message}
            </Text>
          </View>
          <View style={[
            styles.buttonContainer,
            isMultiButton && styles.buttonContainerMulti
          ]}>
            {
              buttons.map(
                ({ text, onPress }, i) => (
                  <TouchableHighlight
                    key={i}
                    onPress={this.onButtonPress(onPress)}
                    ref={this._addButtonRef(i)}
                    style={[
                      styles.button,
                      ((i < buttons.length - 1) && (isMultiButton ? styles.buttonSpacerMulti : styles.buttonSpacer))
                    ]}
                    underlayColor="#f0f0f0"
                  >
                    <Text
                      style={styles.buttonLabel}
                    >
                      { text }
                    </Text>
                  </TouchableHighlight>
                )
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const saveRef = (r) => { instance = r; };

export default {
  AlertView: () => (
    <AlertViewClass ref={saveRef} />
  ),
  alert(title, message, buttons = [ { text: 'OK' } ], options) {
    instance.setState({
      visible: true,
      title,
      message,
      buttons,
      options
    });
  }
};
