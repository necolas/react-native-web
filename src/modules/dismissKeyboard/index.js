import TextInputState from '../../components/TextInput/TextInputState';

const dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};

export default dismissKeyboard;
