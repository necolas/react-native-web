import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import View from '../../components/View';
import Text from '../../components/Text';
import TouchableOpacity from '../../components/Touchable/TouchableOpacity';

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
    borderRadius: 10,
    backgroundColor: '#f8f8f8'
  },
  textContainer: {
    paddingTop: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    color: '#2b3137',
    borderRadius: 2,
    fontSize: 21,
    fontWeight: 'bold'
  },
  message: {
    color: '#2b3137',
    marginTop: 4,
    fontSize: 18,
    maxWidth: 200,
    textAlign: 'center'
  },
  buttonContainer: {
    borderTopColor: '#dbdbdb',
    flexDirection: 'row',
    borderTopWidth: 1,
    flex: 1,
    marginTop: 20
  },
  buttonContainerMulti: {
    flexDirection: 'column'
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  buttonSpacer: {
    borderRightColor: '#dbdbdb',
    borderRightWidth: 1
  },
  buttonSpacerMulti: {
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1
  },
  buttonLabel: {
    color: '#4b8ffe',
    fontSize: 21
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
                  <TouchableOpacity
                    key={i}
                    onPress={this.onButtonPress(onPress)}
                    style={[
                      styles.button,
                      ((i < buttons.length - 1) && (isMultiButton ? styles.buttonSpacerMulti : styles.buttonSpacer))
                    ]}
                  >
                    <Text
                      style={styles.buttonLabel}
                    >
                      { text }
                    </Text>
                  </TouchableOpacity>
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
