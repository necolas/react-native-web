import styled from 'styled-components/native';
import View from './View';

const Dot = styled(View).attrs({
  style: {
    transform: [{ translateX: '50%' }, { translateY: '50%' }]
  }
})`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
  margin-left: ${props => props.x}
  margin-top: ${props => props.y}
  border-right-width: ${props => props.size / 2};
  border-bottom-width: ${props => props.size / 2};
  border-bottom-color: ${props => props.color};
`;

export default Dot;
