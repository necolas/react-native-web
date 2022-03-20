import { styled } from '@stitches/react';
import View from './View';

const Box = styled(View, {
  alignSelf: 'flex-start',
  backgroundColor: 'transparent',
  variants: {
    layout: {
      column: {
        flexDirection: 'column'
      },
      row: {
        flexDirection: 'row'
      }
    },
    outer: {
      true: {
        padding: '4px'
      },
      false: {
        padding: '0'
      }
    },
    fixed: {
      true: {
        height: '6px',
        width: '6px'
      }
    },
    color: {
      0: {
        backgroundColor: '#14171A'
      },
      1: {
        backgroundColor: '#AAB8C2'
      },
      2: {
        backgroundColor: '#E6ECF0'
      },
      3: {
        backgroundColor: '#FFAD1F'
      },
      4: {
        backgroundColor: '#F45D22'
      },
      5: {
        backgroundColor: '#E0245E'
      }
    }
  }
});

export default Box;
