import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  clearTextOnFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  selection: PropTypes.object,
  spellCheck: PropTypes.bool,
  value: PropTypes.string
};

const ofMethods = () => {};

ofMethods.propTypes = {
  blur: PropTypes.func,
  clear: PropTypes.func,
  focus: PropTypes.func,
  isFocused: PropTypes.func
};

export default {
  title: 'Components|TextInput',
  includeStories: []
};

export { ofProps, ofMethods };

export { default as autoCapitalize } from './examples/AutoCapitalize';
export { default as blurOnSubmit } from './examples/BlurOnSubmit';
export { default as clearButtonMode } from './examples/ClearButtonMode';
export { default as clearTextOnFocus } from './examples/ClearTextOnFocus';
export { default as disabled } from './examples/Disabled';
export { default as editable } from './examples/Editable';
export { default as keyboardType } from './examples/KeyboardType';
export { default as maxLength } from './examples/MaxLength';
export { default as multiline } from './examples/Multiline';
export { default as numberOfLines } from './examples/NumberOfLines';
export { default as onSelectionChange } from './examples/OnSelectionChange';
export { default as placeholder } from './examples/Placeholder';
export { default as placeholderTextColor } from './examples/PlaceholderTextColor';
export { default as secureTextEntry } from './examples/SecureTextEntry';
export { default as selectTextOnFocus } from './examples/SelectTextOnFocus';
