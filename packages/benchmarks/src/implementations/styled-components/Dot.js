/* eslint-disable react/prop-types */
import styled from 'styled-components';
import View from './View';

const Dot = styled(View).attrs({
  style: props => ({
    left: `${props.x}px`,
    top: `${props.y}px`,
    borderRightWidth: `${props.size / 2}px`,
    borderBottomWidth: `${props.size / 2}px`,
    borderLeftWidth: `${props.size / 2}px`,
    borderBottomColor: `${props.color}`
  })
})`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
`;

export default Dot;
