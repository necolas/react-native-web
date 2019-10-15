import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  color: PropTypes.any,
  indeterminate: PropTypes.bool,
  progress: PropTypes.number,
  trackColor: PropTypes.any
};

ofProps.defaultProps = {
  color: '#1976D2',
  indeterminate: false,
  progress: 0,
  trackColor: 'transparent'
};

export default {
  title: 'Components|ProgressBar',
  includeStories: []
};

export { ofProps };

export { default as color } from './examples/Color';
export { default as indeterminate } from './examples/Indeterminate';
export { default as progress } from './examples/Progress';
export { default as trackColor } from './examples/TrackColor';

export { default as customSize } from './examples/CustomSize';
