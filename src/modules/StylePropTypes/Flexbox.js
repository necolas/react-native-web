import { PropTypes } from 'react';

export default {
  alignContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'stretch',
    'space-around',
    'space-between'
  ]),
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch'
  ]),
  alignSelf: PropTypes.oneOf([
    'auto',
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch'
  ]),
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.oneOf([
    'column',
    'column-reverse',
    'row',
    'row-reverse'
  ]),
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexWrap: PropTypes.oneOf([
    'nowrap',
    'wrap',
    'wrap-reverse'
  ]),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between'
  ]),
  order: PropTypes.number
};
