import styled from 'styled-components';
import View from '../View/styled-components';

const getColor = color => {
  switch (color) {
    case 0:
      return '#222';
    case 1:
      return '#666';
    case 2:
      return '#999';
    case 3:
      return 'blue';
    case 4:
      return 'orange';
    case 5:
      return 'red';
    default:
      return 'transparent';
  }
};

const Box = styled(View)`
  flex-direction: ${props => (props.layout === 'column' ? 'column' : 'row')};
  padding: ${props => (props.outer ? '4px' : '0')};
  height: ${props => (props.fixed ? '20px' : 'auto')};
  width: ${props => (props.fixed ? '20px' : 'auto')};
  background-color: ${props => getColor(props.color)};
`;

export default Box;
