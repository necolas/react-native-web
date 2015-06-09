import {PropTypes} from 'react';

export default {
  position: PropTypes.oneOf([
    'absolute',
    'fixed',
    'relative'
  ]),
  bottom: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  left: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  right: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  top: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  zIndex: PropTypes.number
};
