import TextInputState from '../../components/TextInput/TextInputState';

const dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};

module.exports = dismissKeyboard;
