/**
 * @flow
 */

import { createDOMElement, StyleSheet } from 'react-native';

const Code = props => createDOMElement('code', { ...props, style: [styles.code, props.style] });

export default Code;

const styles = StyleSheet.create({
  code: {
    fontFamily: 'monospace, monospace',
    lineHeight: '1.3125em',
    whiteSpace: 'pre'
  }
});
