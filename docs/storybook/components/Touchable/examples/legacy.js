/**
 * @flow
 */

/*
import React from 'react';
import UIExplorer, { PropText } from '../../ui-explorer';
import { action, storiesOf } from '@kadira/storybook';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View
} from 'react-native';

class TouchableFeedbackEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventLog: [] };
  }

  render() {
    return (
      <View testID="touchable_feedback_events">
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity
            accessibilityComponentType="button"
            accessibilityLabel="touchable feedback events"
            accessibilityTraits="button"
            onLongPress={this._createPressHandler('longPress')}
            onPress={this._createPressHandler('press')}
            onPressIn={this._createPressHandler('pressIn')}
            onPressOut={this._createPressHandler('pressOut')}
            style={styles.wrapper}
            testID="touchable_feedback_events_button"
          >
            <Text style={styles.button}>
              Press Me
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventLogBox} testID="touchable_feedback_events_console">
          {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
        </View>
      </View>
    );
  }

  _createPressHandler = eventName => {
    return () => {
      const limit = 6;
      const eventLog = this.state.eventLog.slice(0, limit - 1);
      eventLog.unshift(eventName);
      this.setState({ eventLog });
    };
  };
}

class TouchableDelayEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventLog: [] };
  }

  render() {
    return (
      <View testID="touchable_delay_events">
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity
            delayLongPress={800}
            delayPressIn={400}
            delayPressOut={1000}
            onLongPress={this._createPressHandler('longPress - 800ms delay')}
            onPress={this._createPressHandler('press')}
            onPressIn={this._createPressHandler('pressIn - 400ms delay')}
            onPressOut={this._createPressHandler('pressOut - 1000ms delay')}
            style={styles.wrapper}
            testID="touchable_delay_events_button"
          >
            <Text style={styles.button}>
              Press Me
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventLogBox} testID="touchable_delay_events_console">
          {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
        </View>
      </View>
    );
  }

  _createPressHandler = eventName => {
    return () => {
      const limit = 6;
      const eventLog = this.state.eventLog.slice(0, limit - 1);
      eventLog.unshift(eventName);
      this.setState({ eventLog });
    };
  };
}

const heartImage = { uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small' };

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    width: 24,
    height: 24
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    fontSize: 16
  },
  block: {
    padding: 10
  },
  button: {
    color: '#007AFF'
  },
  disabledButton: {
    color: '#007AFF',
    opacity: 0.5
  },
  nativeFeedbackButton: {
    textAlign: 'center',
    margin: 10
  },
  hitSlopButton: {
    color: 'white'
  },
  wrapper: {
    borderRadius: 8
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  hitSlopWrapper: {
    backgroundColor: 'red',
    marginVertical: 30
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  },
  eventLogBox: {
    padding: 10,
    margin: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  },
  forceTouchBox: {
    padding: 10,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    alignItems: 'center'
  },
  textBlock: {
    fontWeight: '500',
    color: 'blue'
  }
});

const examples = [
  {
    title: '<TouchableHighlight>',
    description:
      'TouchableHighlight works by adding an extra view with a ' +
        'black background under the single child view.  This works best when the ' +
        'child view is fully opaque, although it can be made to work as a simple ' +
        'background color change as well with the activeOpacity and ' +
        'underlayColor props.',
    render() {
      return (
        <View>
          <View style={styles.row}>
            <TouchableHighlight
              onPress={() => console.log('stock THW image - highlight')}
              style={styles.wrapper}
            >
              <Image source={heartImage} style={styles.image} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={1}
              onPress={() => console.log('custom THW text - highlight')}
              style={styles.wrapper}
              underlayColor="rgb(210, 230, 255)"
            >
              <View style={styles.wrapperCustom}>
                <Text style={styles.text}>
                  Tap Here For Custom Highlight!
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  },
  {
    title: 'Touchable feedback events',
    description:
      '<Touchable*> components accept onPress, onPressIn, ' +
        'onPressOut, and onLongPress as props.',
    render() {
      return <TouchableFeedbackEvents />;
    }
  },
  {
    title: 'Touchable delay for events',
    description:
      '<Touchable*> components also accept delayPressIn, ' +
        'delayPressOut, and delayLongPress as props. These props impact the ' +
        'timing of feedback events.',
    render() {
      return <TouchableDelayEvents />;
    }
  },
  {
    title: 'Disabled Touchable*',
    description:
      '<Touchable*> components accept disabled prop which prevents ' +
        'any interaction with component',
    render() {
      return <TouchableDisabled />;
    }
  }
];
*/
