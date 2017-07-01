import TweetAction from '../TweetAction';
import { View, StyleSheet } from 'react-native';
import React, { PropTypes, PureComponent } from 'react';

const actionNames = ['reply', 'retweet', 'like', 'directMessage'];

export default class TweetActionsBar extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        count: PropTypes.number,
        label: PropTypes.string,
        highlighted: PropTypes.bool,
        name: PropTypes.oneOf(actionNames).isRequired,
        onPress: PropTypes.func
      })
    ),
    style: PropTypes.object
  };

  render() {
    const { actions, style } = this.props;

    /* eslint-disable react/jsx-handler-names */
    return (
      <View style={[styles.root, style]}>
        {actions.map((action, i) =>
          <TweetAction
            accessibilityLabel={actions.label}
            count={action.count}
            displayMode={action.name}
            highlighted={action.highlighted}
            key={i}
            onPress={action.onPress}
            style={styles.action}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row'
  },
  action: {
    display: 'block',
    marginRight: '10%'
  }
});
