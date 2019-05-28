import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import View from '../View';
import StyleSheet from '../StyleSheet';

export default function AlertDefaultComponent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.messageWrapper}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
      {renderButtons(props)}
    </View>
  );
}

AlertDefaultComponent.propTypes = {
  Button: PropTypes.oneOfType([PropTypes.instanceOf(Component), PropTypes.func]),
  buttons: PropTypes.array,
  message: PropTypes.string,
  title: PropTypes.string
};

function renderButtons(props) {
  const Button = props.Button;
  const components = props.buttons.map((b, i) => (
    <Button index={i} key={'b' + i} onPress={b.onPress} text={b.text} type={b.type} />
  ));

  return <View style={styles.buttonsWrapper}>{components}</View>;
}

renderButtons.propTypes = {
  Button: PropTypes.element,
  buttons: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
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
