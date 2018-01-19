import styled from 'styled-jss';

const Dot = styled('div')({
  position: 'absolute',
  cursor: 'pointer',
  width: 0,
  height: 0,
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderTopWidth: 0,
  transform: 'translateX(50%) translateY(50%)',

  borderBottomColor: props => props.color,
  borderRightWidth: props => props.size / 2,
  borderBottomWidth: props => props.size / 2,
  borderLeftWidth: props => props.size / 2,
  marginLeft: props => props.x,
  marginTop: props => props.y
});

export default Dot;
