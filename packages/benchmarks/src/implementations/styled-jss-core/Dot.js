import styled from './styled';

const Dot = styled('div')({
  position: 'absolute',
  cursor: 'pointer',
  width: 0,
  height: 0,
  'border-color': 'transparent',
  'border-style': 'solid',
  'border-top-width': 0,
  transform: 'translateX(50%) translateY(50%)',

  'border-bottom-color': props => props.color,
  'border-right-width': props => `${props.size / 2}px`,
  'border-bottom-width': props => `${props.size / 2}px`,
  'border-left-width': props => `${props.size / 2}px`,
  'margin-left': props => `${props.x}px`,
  'margin-top': props => `${props.y}px`
});

export default Dot;
