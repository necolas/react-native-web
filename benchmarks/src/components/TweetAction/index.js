import IconReply from '../Icons/Reply';
import IconHeart from '../Icons/Heart';
import IconRetweet from '../Icons/Retweet';
import IconDirectMessage from '../Icons/DirectMessage';
import { Text, View, StyleSheet } from 'react-native';
import React, { PropTypes } from 'react';
import theme from '../theme';

const getIcon = (icon, highlighted) => {
  switch (icon) {
    case 'like':
      return <IconHeart />;
    case 'reply':
      return <IconReply />;
    case 'retweet':
      return <IconRetweet />;
    case 'directMessage':
      return <IconDirectMessage />;
    default:
      return null;
  }
};

export default class TweetAction extends React.Component {
  static displayName = 'TweetAction';

  static propTypes = {
    count: PropTypes.number,
    displayMode: PropTypes.oneOf(['like', 'reply', 'retweet', 'directMessage']),
    highlighted: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.object
  };

  render() {
    const { count, displayMode, highlighted, onPress, style } = this.props;

    return (
      <View accessibilityRole="button" onPress={onPress} style={[styles.root, style]}>
        <Text
          style={[
            styles.inner,
            displayMode === 'like' && highlighted && styles.likedColor,
            displayMode === 'retweet' && highlighted && styles.retweetedColor
          ]}
        >
          {getIcon(displayMode, highlighted)}
          {count > 0 ? <Text style={styles.count}>{count}</Text> : null}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    minHeight: theme.createLength(theme.lineHeight, 'rem'),
    overflow: 'visible',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  inner: {
    alignItems: 'center',
    color: theme.colors.deepGray,
    display: 'flex',
    flexDirection: 'row'
  },
  count: {
    marginLeft: '0.25em'
  },
  retweetedColor: {
    color: theme.colors.green
  },
  likedColor: {
    color: theme.colors.red
  }
});
