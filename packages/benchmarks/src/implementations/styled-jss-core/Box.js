import styled from './styled';
import View from './View';

const COLORS = ['#14171A', '#AAB8C2', '#E6ECF0', '#FFAD1F', '#F45D22', '#E0245E'];

const Box = styled(View)({
  'align-self': 'flex-start',
  'flex-direction': props => (props.layout === 'column' ? 'column' : 'row'),
  padding: props => (props.outer ? '4px' : '0'),
  height: props => (props.fixed ? '6px' : 'initial'),
  width: props => (props.fixed ? '6px' : 'initial'),
  'background-color': props => COLORS[props.color] || 'transparent'
});

export default Box;
