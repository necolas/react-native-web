import styled from 'styled-jss';
import View from './View';

const COLORS = ['#14171A', '#AAB8C2', '#E6ECF0', '#FFAD1F', '#F45D22', '#E0245E'];

const Box = styled(View)({
  alignSelf: 'flex-start',
  flexDirection: props => (props.layout === 'column' ? 'column' : 'row'),
  padding: props => (props.outer ? 4 : 0),
  height: props => (props.fixed ? 6 : 'initial'),
  width: props => (props.fixed ? 6 : 'initial'),
  backgroundColor: props => COLORS[props.color] || 'transparent'
});

export default Box;
