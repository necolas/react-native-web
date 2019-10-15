import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any
};

ofProps.defaultProps = {};

export default {
  title: 'Components|ScrollView',
  includeStories: []
};

export { ofProps };
export { default as horizontal } from './examples/Horizontal';
export { default as onScroll } from './examples/OnScroll';
export { default as scrollEnabled } from './examples/ScrollEnabled';
export { default as vertical } from './examples/Vertical';
