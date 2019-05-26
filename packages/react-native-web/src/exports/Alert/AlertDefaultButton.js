import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import View from '../View';
import StyleSheet from '../StyleSheet';

export default function AlertDefaultButton(props) {
  let color;
  if (props.type && props.type === 'destructive') {
    color = 'red';
  }

  return (
    <View style={[styles.container, !props.index && styles.containerFirst]}>
      <Button color={color} onPress={props.onPress} title={props.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },

  containerFirst: {
    marginTop: 0
  }
});

AlertDefaultButton.propTypes = {
  index: PropTypes.number,
  onPress: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};
