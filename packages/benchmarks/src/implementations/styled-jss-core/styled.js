import { create as createJss } from 'jss';
import createStyled from 'styled-jss/createStyled';

const jss = createJss();

const Styled = createStyled(jss);

export default Styled();
