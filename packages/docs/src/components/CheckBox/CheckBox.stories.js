import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  value: PropTypes.bool
};

ofProps.defaultProps = {
  disabled: false,
  value: false
};

export default {
  title: 'Components|CheckBox',
  includeStories: []
};

export { ofProps };
export { default as color } from './examples/Color';
export { default as disabled } from './examples/Disabled';
export { default as onValueChange } from './examples/OnValueChange';
export { default as value } from './examples/Value';
export { default as customSize } from './examples/CustomSize';
