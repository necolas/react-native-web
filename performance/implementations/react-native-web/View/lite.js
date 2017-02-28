import createDOMElement from 'react-native/modules/createDOMElement';
import StyleSheet from 'react-native/apis/StyleSheet';

const View = props => createDOMElement('div', { ...props, style: [styles.initial, props.style] });

const styles = StyleSheet.create({
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button and anchor reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    // list reset
    listStyle: 'none',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  }
});

module.exports = View;
