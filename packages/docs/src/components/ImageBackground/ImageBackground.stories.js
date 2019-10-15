import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ImagePropTypes': PropTypes.any,
  children: PropTypes.number,
  imageStyle: PropTypes.any
};

ofProps.defaultProps = {};

export default {
  title: 'Components|ImageBackground',
  includeStories: []
};

export { ofProps };
export { default as children } from './examples/Children';
