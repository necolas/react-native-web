import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...TouchableWithoutFeedbackPropTypes': PropTypes.any,
  activeOpacity: PropTypes.number,
  focusedOpacity: PropTypes.func,
  onShowUnderlay: PropTypes.func,
  underlayColor: PropTypes.string
};

ofProps.defaultProps = {
  activeOpacity: '0.2',
  focusedOpacity: '0.7'
};

const ofMethods = () => {};

ofMethods.propTypes = {
  setOpacityTo: PropTypes.func
};

export default {
  title: 'Components|TouchableOpacity',
  includeStories: []
};

export { ofMethods, ofProps };
//export { default as color } from './examples/Color';
export { default as disabled } from './examples/Disabled';
//export { default as onPress } from './examples/OnPress';
