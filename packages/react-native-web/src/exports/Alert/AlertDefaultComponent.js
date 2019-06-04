import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import View from '../View';
import StyleSheet from '../StyleSheet';

export default function AlertDefaultComponent(props) {
  const customStyles = props.customStyles;

  return (
    <View style={[styles.alertWrapper, customStyles.alertWrapper]}>
      <View style={[styles.titleWrapper, customStyles.titleWrapper]}>
        <Text style={[styles.title, customStyles.title]}>{props.title}</Text>
      </View>
      <View style={[styles.messageWrapper, customStyles.messageWrapper]}>
        <Text style={[styles.message, customStyles.message]}>{props.message}</Text>
      </View>
      {renderButtons(props)}
    </View>
  );
}

AlertDefaultComponent.propTypes = {
  Button: PropTypes.oneOfType([PropTypes.instanceOf(Component), PropTypes.func]),
  buttons: PropTypes.array,
  customStyles: PropTypes.object,
  message: PropTypes.string,
  title: PropTypes.string
};

function renderButtons(props) {
  const Button = props.Button;
  const components = props.buttons.map((b, i) => (
    <Button
      customStyles={props.customStyles}
      index={i}
      key={'b' + i}
      onPress={b.onPress}
      text={b.text}
      type={b.type}
    />
  ));

  return (
    <View style={[styles.buttonsWrapper, props.customStyles.buttonsWrapper]}>{components}</View>
  );
}

renderButtons.propTypes = {
  Button: PropTypes.element,
  buttons: PropTypes.array,
  customStyles: PropTypes.object
};

const styles = StyleSheet.create({
  alertWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    maxWidth: 300,
    shadowColor: 'rgba(0,0,0,.2)',
    shadowOpacity: 1.0,
    shadowRadius: 20
  },
  titleWrapper: {
    marginBottom: 10
  },
  title: {
    fontWeight: '600'
  },
  buttonsWrapper: {
    marginTop: 20
  }
});
