/* eslint-disable react/jsx-no-bind */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
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

const examples = [
  {
    title: '<TouchableHighlight>',
    description: 'TouchableHighlight works by adding an extra view with a ' +
      'black background under the single child view.  This works best when the ' +
      'child view is fully opaque, although it can be made to work as a simple ' +
      'background color change as well with the activeOpacity and ' +
      'underlayColor props.',
    render: function() {
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
    title: '<Text onPress={fn}> with highlight',
    render: function() {
      return <TextOnPressBox />;
    }
  },
  {
    title: 'Touchable feedback events',
    description: '<Touchable*> components accept onPress, onPressIn, ' +
      'onPressOut, and onLongPress as props.',
    render: function() {
      return <TouchableFeedbackEvents />;
    }
  },
  {
    title: 'Touchable delay for events',
    description: '<Touchable*> components also accept delayPressIn, ' +
      'delayPressOut, and delayLongPress as props. These props impact the ' +
      'timing of feedback events.',
    render: function() {
      return <TouchableDelayEvents />;
    }
  },
  {
    title: '3D Touch / Force Touch',
    description: 'iPhone 6s and 6s plus support 3D touch, which adds a force property to touches',
    render: function() {
      return <ForceTouchExample />;
    },
    platform: 'ios'
  },
  {
    title: 'Touchable Hit Slop',
    description: '<Touchable*> components accept hitSlop prop which extends the touch area ' +
      'without changing the view bounds.',
    render: function() {
      return <TouchableHitSlop />;
    }
  },
  {
    title: 'Disabled Touchable*',
    description: '<Touchable*> components accept disabled prop which prevents ' +
      'any interaction with component',
    render: function() {
      return <TouchableDisabled />;
    }
  }
];

class TextOnPressBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesPressed: 0 };
  }

  _handlePress = () => {
    this.setState({
      timesPressed: this.state.timesPressed + 1
    });
  };

  render() {
    let textLog = '';
    if (this.state.timesPressed > 1) {
      textLog = this.state.timesPressed + 'x text onPress';
    } else if (this.state.timesPressed > 0) {
      textLog = 'text onPress';
    }

    return (
      <View>
        <Text onPress={this._handlePress} style={styles.textBlock}>
          Text has built-in onPress handling
        </Text>
        <View style={styles.logBox}>
          <Text>{textLog}</Text>
        </View>
      </View>
    );
  }
}

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

class ForceTouchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { force: 0 };
  }

  _renderConsoleText() {
    return View.forceTouchAvailable
      ? 'Force: ' + this.state.force.toFixed(3)
      : '3D Touch is not available on this device';
  }

  render() {
    return (
      <View testID="touchable_3dtouch_event">
        <View style={styles.forceTouchBox} testID="touchable_3dtouch_output">
          <Text>{this._renderConsoleText()}</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <View
            onResponderMove={event => this.setState({ force: event.nativeEvent.force })}
            onResponderRelease={event => this.setState({ force: 0 })}
            onStartShouldSetResponder={() => true}
            style={styles.wrapper}
            testID="touchable_3dtouch_button"
          >
            <Text style={styles.button}>
              Press Me
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

class TouchableHitSlop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesPressed: 0 };
  }

  _handlePress = () => {
    this.setState({
      timesPressed: this.state.timesPressed + 1
    });
  };

  render() {
    let log = '';
    if (this.state.timesPressed > 1) {
      log = this.state.timesPressed + 'x onPress';
    } else if (this.state.timesPressed > 0) {
      log = 'onPress';
    }

    return (
      <View testID="touchable_hit_slop">
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity
            hitSlop={{ top: 30, bottom: 30, left: 60, right: 60 }}
            onPress={this._handlePress}
            style={styles.hitSlopWrapper}
            testID="touchable_hit_slop_button"
          >
            <Text style={styles.hitSlopButton}>
              Press Outside This View
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logBox}>
          <Text>
            {log}
          </Text>
        </View>
      </View>
    );
  }
}

class TouchableDisabled extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          disabled={true}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.disabledButton}>Disabled TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={false}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.button}>Enabled TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableHighlight
          activeOpacity={1}
          disabled={true}
          onPress={action('TouchableHighlight')}
          style={[styles.row, styles.block]}
          underlayColor="rgb(210, 230, 255)"
        >
          <Text style={styles.disabledButton}>
            Disabled TouchableHighlight
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={1}
          onPress={action('TouchableHighlight')}
          style={[styles.row, styles.block]}
          underlayColor="rgb(210, 230, 255)"
        >
          <Text style={styles.button}>
            Enabled TouchableHighlight
          </Text>
        </TouchableHighlight>

        {Platform.OS === 'android' &&
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => console.log('custom TNF has been clicked')}
            style={[styles.row, styles.block]}
          >
            <View>
              <Text style={[styles.button, styles.nativeFeedbackButton]}>
                Enabled TouchableNativeFeedback
              </Text>
            </View>
          </TouchableNativeFeedback>}

        {Platform.OS === 'android' &&
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            disabled={true}
            onPress={() => console.log('custom TNF has been clicked')}
            style={[styles.row, styles.block]}
          >
            <View>
              <Text style={[styles.disabledButton, styles.nativeFeedbackButton]}>
                Disabled TouchableNativeFeedback
              </Text>
            </View>
          </TouchableNativeFeedback>}
      </View>
    );
  }
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

examples.forEach(example => {
  storiesOf('component: Touchable*', module).add(example.title, () => example.render());
});
