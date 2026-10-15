import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from './theme';

class AppText extends React.Component {
  static displayName = '@app/Text';

  render() {
    const { style, ...rest } = this.props;
    return <Text {...rest} style={[styles.baseText, style]} />;
  }
}

const styles = StyleSheet.create({
  baseText: {
    color: colors.textBlack,
    fontSize: '1rem',
    lineHeight: '1.3125em'
  }
});

export default AppText;
