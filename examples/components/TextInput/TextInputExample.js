import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { StyleSheet, Text, TextInput, View } from 'react-native'

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

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class TextEventsExample extends React.Component {
  state = {
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
    prev3Text: '<No Event>',
  };

  updateText = (text) => {
    this.setState((state) => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text,
      };
    });
  };

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter text to see events"
          autoCorrect={false}
          onFocus={() => this.updateText('onFocus')}
          onBlur={() => this.updateText('onBlur')}
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}
          onSelectionChange={(event) => this.updateText(
            'onSelectionChange range: ' +
              event.nativeEvent.selection.start + ',' +
              event.nativeEvent.selection.end
          )}
          onKeyPress={(event) => {
            this.updateText('onKeyPress key: ' + event.nativeEvent.key);
          }}
          style={[ styles.default, { maxWidth: 200 } ]}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}{'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text}){'\n'}
          (prev3: {this.state.prev3Text})
        </Text>
      </View>
    );
  }
}

class AutoExpandingTextInput extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0,
    };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChangeText={(text) => {
          this.setState({text});
        }}
        onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
      />
    );
  }
}

class RewriteExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            text = text.replace(/ /g, '_');
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
          {remainder}
        </Text>
      </View>
    );
  }
}

class RewriteExampleInvalidCharacters extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          onChangeText={(text) => {
            this.setState({text: text.replace(/\s/g, '')});
          }}
          style={styles.default}
          value={this.state.text}
        />
      </View>
    );
  }
}

class TokenizedTextExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: 'Hello #World'};
  }
  render() {

    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index, parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    return (
      <View>
        <TextInput
          value={parts.join('')}
          multiline={true}
          style={styles.multiline}
          onChangeText={(text) => {
            this.setState({text});
          }}
        />
      </View>
    );
  }
}

class BlurOnSubmitExample extends React.Component {
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    return (
      <View>
        <TextInput
          ref="1"
          style={styles.default}
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.default}
          keyboardType="email-address"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput
          ref="3"
          style={styles.default}
          keyboardType="url"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput
          ref="4"
          style={styles.default}
          keyboardType="numeric"
          placeholder="blurOnSubmit = false"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('5')}
        />
        <TextInput
          ref="5"
          style={styles.default}
          keyboardType="numeric"
          placeholder="blurOnSubmit = true"
          returnKeyType="done"
        />
      </View>
    );
  }
}

type SelectionExampleState = {
  selection: {
    start: number;
    end?: number;
  };
  value: string;
};

class SelectionExample extends React.Component {
  state: SelectionExampleState;

  _textInput: any;

  constructor(props) {
    super(props);
    this.state = {
      selection: {start: 0, end: 0},
      value: props.value
    };
  }

  onSelectionChange({nativeEvent: {selection}}) {
    this.setState({selection});
  }

  getRandomPosition() {
    var length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select(start, end) {
    this._textInput.focus();
    this.setState({selection: {start, end}});
  }

  selectRandom() {
    var positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions);
  }

  placeAt(position) {
    this.select(position, position);
  }

  placeAtRandom() {
    this.placeAt(this.getRandomPosition());
  }

  render() {
    var length = this.state.value.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={(value) => this.setState({value})}
          onSelectionChange={this.onSelectionChange.bind(this)}
          ref={textInput => (this._textInput = textInput)}
          selection={this.state.selection}
          style={this.props.style}
          value={this.state.value}
        />
        <View>
          <Text>
            selection = {JSON.stringify(this.state.selection)}
          </Text>
          <Text onPress={this.placeAt.bind(this, 0)}>
            Place at Start (0, 0)
          </Text>
          <Text onPress={this.placeAt.bind(this, length)}>
            Place at End ({length}, {length})
          </Text>
          <Text onPress={this.placeAtRandom.bind(this)}>
            Place at Random
          </Text>
          <Text onPress={this.select.bind(this, 0, length)}>
            Select All
          </Text>
          <Text onPress={this.selectRandom.bind(this)}>
            Select Random
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    paddingBottom: 300,
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4,
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
  multilineChild: {
    width: 50,
    height: 40,
    position: 'absolute',
    right: 5,
    backgroundColor: 'red',
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2,
  },
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainder: {
    textAlign: 'right',
    width: 24,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

const examples = [
  {
    title: 'Auto-focus',
    render: function() {
      return (
        <View>
          <TextInput
            autoFocus={true}
            style={styles.default}
            accessibilityLabel="I am the accessibility label for text input"
          />
        </View>
      );
    }
  },
  {
    title: "Live Re-Write (<sp>  ->  '_') + maxLength",
    render: function() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Live Re-Write (no spaces allowed)',
    render: function() {
      return <RewriteExampleInvalidCharacters />;
    }
  },
  {
    title: 'Auto-capitalize',
    render: function() {
      return (
        <View>
          <WithLabel label="none">
            <TextInput
              autoCapitalize="none"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="sentences">
            <TextInput
              autoCapitalize="sentences"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="words">
            <TextInput
              autoCapitalize="words"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="characters">
            <TextInput
              autoCapitalize="characters"
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Auto-correct',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput autoCorrect={true} style={styles.default} />
          </WithLabel>
          <WithLabel label="false">
            <TextInput autoCorrect={false} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Keyboard types',
    render: function() {
      var keyboardTypes = [
        'default',
        //'ascii-capable',
        //'numbers-and-punctuation',
        'url',
        'number-pad',
        'phone-pad',
        //'name-phone-pad',
        'email-address',
        //'decimal-pad',
        //'twitter',
        'web-search',
        'numeric',
      ];
      var examples = keyboardTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              keyboardType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Keyboard appearance',
    render: function() {
      var keyboardAppearance = [
        'default',
        'light',
        'dark',
      ];
      var examples = keyboardAppearance.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              keyboardAppearance={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Return key types',
    render: function() {
      var returnKeyTypes = [
        'default',
        'go',
        'google',
        'join',
        'next',
        'route',
        'search',
        'send',
        'yahoo',
        'done',
        'emergency-call',
      ];
      var examples = returnKeyTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              returnKeyType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Enable return key automatically',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput enablesReturnKeyAutomatically={true} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Secure text entry',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput secureTextEntry={true} style={styles.default} defaultValue="abc" />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Event handling',
    render: function(): React.Element<any> { return <TextEventsExample />; },
  },
  {
    title: 'Colored input text',
    render: function() {
      return (
        <View>
          <TextInput
            style={[styles.default, {color: 'blue'}]}
            defaultValue="Blue"
          />
          <TextInput
            style={[styles.default, {color: 'green'}]}
            defaultValue="Green"
          />
        </View>
      );
    }
  },
  {
    title: 'Colored highlight/cursor for text input',
    render: function() {
      return (
        <View>
          <TextInput
            style={styles.default}
            selectionColor={"green"}
            defaultValue="Highlight me"
          />
          <TextInput
            style={styles.default}
            selectionColor={"rgba(86, 76, 205, 1)"}
            defaultValue="Highlight me"
          />
        </View>
      );
    }
  },
  {
    title: 'Clear button mode',
    render: function () {
      return (
        <View>
          <WithLabel label="never">
            <TextInput
              style={styles.default}
              clearButtonMode="never"
            />
          </WithLabel>
          <WithLabel label="while editing">
            <TextInput
              style={styles.default}
              clearButtonMode="while-editing"
            />
          </WithLabel>
          <WithLabel label="unless editing">
            <TextInput
              style={styles.default}
              clearButtonMode="unless-editing"
            />
          </WithLabel>
          <WithLabel label="always">
            <TextInput
              style={styles.default}
              clearButtonMode="always"
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Clear and select',
    render: function() {
      return (
        <View>
          <WithLabel label="clearTextOnFocus">
            <TextInput
              placeholder="text is cleared on focus"
              defaultValue="text is cleared on focus"
              style={styles.default}
              clearTextOnFocus={true}
            />
          </WithLabel>
          <WithLabel label="selectTextOnFocus">
            <TextInput
              placeholder="text is selected on focus"
              defaultValue="text is selected on focus"
              style={styles.default}
              selectTextOnFocus={true}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Blur on submit',
    render: function(): React.Element<any> { return <BlurOnSubmitExample />; },
  },
  {
    title: 'Multiline blur on submit',
    render: function() {
      return (
        <View>
          <TextInput
            style={styles.multiline}
            placeholder="blurOnSubmit = true"
            returnKeyType="next"
            blurOnSubmit={true}
            multiline={true}
            onSubmitEditing={event => alert(event.nativeEvent.text)}
          />
        </View>
      );
    }
  },
  {
    title: 'Multiline',
    render: function() {
      return (
        <View>
          <TextInput
            placeholder="multiline text input"
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            placeholder="multiline text input with font styles and placeholder"
            multiline={true}
            clearTextOnFocus={true}
            autoCorrect={true}
            autoCapitalize="words"
            placeholderTextColor="red"
            keyboardType="url"
            style={[styles.multiline, styles.multilineWithFontStyles]}
          />
          <TextInput
            placeholder="multiline text input with max length"
            maxLength={5}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            placeholder="uneditable multiline text input"
            editable={false}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            defaultValue="uneditable multiline text input with phone number detection: 88888888."
            editable={false}
            multiline={true}
            style={styles.multiline}
            dataDetectorTypes="phoneNumber"
          />
        </View>
      );
    }
  },
  {
    title: 'Number of lines',
    render: function() {
      return (
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[ styles.multiline, { height: 'auto' } ]}
          />
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput
            placeholder="height increases with content"
            enablesReturnKeyAutomatically={true}
            returnKeyType="default"
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Text selection & cursor placement',
    render: function() {
      return (
        <View>
          <SelectionExample
            style={styles.default}
            value="text selection can be changed"
          />
          <SelectionExample
            multiline
            style={styles.multiline}
            value={"multiline text selection\ncan also be changed"}
          />
        </View>
      );
    }
  },
  {
    title: 'TextInput maxLength',
    render: function() {
      return (
        <View>
          <WithLabel label="maxLength: 5">
            <TextInput
              maxLength={5}
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with placeholder">
            <TextInput
              maxLength={5}
              placeholder="ZIP code entry"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with default value already set">
            <TextInput
              maxLength={5}
              defaultValue="94025"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with very long default value already set">
            <TextInput
              maxLength={5}
              defaultValue="9402512345"
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  }
];

examples.forEach((example) => {
  storiesOf('component: TextInput', module)
    .add(example.title, () => example.render())
});
