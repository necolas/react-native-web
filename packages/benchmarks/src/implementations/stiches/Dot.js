import React from 'react';
import { styled } from '@stitches/react';
import View from './View';

const StyledDot = styled(View, {
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderTopWidth: 0,
  cursor: 'pointer',
  height: 0,
  position: 'absolute',
  transform: 'translate(50%, 50%)',
  width: 0
});

function Dot(props) {
  return (
    <StyledDot
      css={{
        borderBottomColor: `${props.color}`,
        borderBottomWidth: `${props.size / 2}px`,
        borderLeftWidth: `${props.size / 2}px`,
        borderRightWidth: `${props.size / 2}px`,
        marginLeft: `${props.x}px`,
        marginTop: `${props.y}px`
      }}
    />
  );
}

export default Dot;
