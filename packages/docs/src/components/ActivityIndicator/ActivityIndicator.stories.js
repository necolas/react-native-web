import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  animating: PropTypes.bool,
  color: PropTypes.string,
  hidesWhenStopped: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'large']), PropTypes.number])
};

ofProps.defaultProps = {
  animating: true,
  color: '#1976D2',
  hidesWhenStopped: true,
  size: 'small'
};

export default {
  title: 'Components|ActivityIndicator',
  includeStories: []
};

export { ofProps };
export { default as animating } from './examples/Animating';
export { default as color } from './examples/Color';
export { default as hidesWhenStopped } from './examples/HidesWhenStopped';
export { default as size } from './examples/Size';
