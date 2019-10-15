import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  activeThumbColor: PropTypes.any,
  activeTrackColor: PropTypes.any,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  thumbColor: PropTypes.any,
  trackColor: PropTypes.any,
  value: PropTypes.bool
};

ofProps.defaultProps = {
  activeThumbColor: '#009688',
  activeTrackColor: '#A3D3CF',
  disabled: false,
  thumbColor: '#FAFAFA',
  trackColor: '#939393',
  value: false
};

export default {
  title: 'Components|Switch',
  includeStories: []
};

export { ofProps };

export { default as activeThumbColor } from './examples/ActiveThumbColor';
export { default as activeTrackColor } from './examples/ActiveTrackColor';
export { default as disabled } from './examples/Disabled';
export { default as onValueChange } from './examples/OnValueChange';
export { default as thumbColor } from './examples/ThumbColor';
export { default as trackColor } from './examples/TrackColor';
export { default as value } from './examples/Value';

export { default as customSize } from './examples/CustomSize';
