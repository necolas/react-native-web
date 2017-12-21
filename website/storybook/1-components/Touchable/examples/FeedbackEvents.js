/**
 * @flow
 */

import { oneOf } from 'prop-types';
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const Touchables = {
  highlight: TouchableHighlight,
  opacity: TouchableOpacity,
  withoutFeedback: TouchableWithoutFeedback
};

export default class TouchableFeedbackEvents extends PureComponent {
  static propTypes = {
    touchable: oneOf(['highlight', 'opacity', 'withoutFeedback'])
  };

  static defaultProps = {
    touchable: 'highlight'
  };

  state = { eventLog: [] };

  render() {
    const Touchable = Touchables[this.props.touchable];
    return (
      <View>
        <View>
          <Touchable
            onLongPress={this._createPressHandler('longPress')}
            onPress={this._createPressHandler('press')}
            onPressIn={this._createPressHandler('pressIn')}
            onPressOut={this._createPressHandler('pressOut')}
          >
            <View>
              <Text style={styles.touchableText}>Press Me</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.eventLogBox}>
          {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
        </View>
      </View>
    );
  }

  _createPressHandler = eventName => {
    return () => {
      const limit = 6;
      this.setState(state => {
        const eventLog = state.eventLog.slice(0, limit - 1);
        eventLog.unshift(eventName);
        return { eventLog };
      });
    };
  };
}

const styles = StyleSheet.create({
  touchableText: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    color: '#007AFF',
    borderStyle: 'solid',
    textAlign: 'center'
  },
  eventLogBox: {
    padding: 10,
    marginTop: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
