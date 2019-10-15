import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  accessibilityLabel: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  title: PropTypes.string
};

ofProps.defaultProps = {
  color: '#2196F3',
  disabled: false
};

export default {
  title: 'Components|Button',
  includeStories: []
};

export { ofProps };
export { default as color } from './examples/Color';
export { default as disabled } from './examples/Disabled';
export { default as onPress } from './examples/OnPress';
