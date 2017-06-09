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
import { storiesOf } from '@kadira/storybook';
import UIExplorer from '../../UIExplorer';
import { any, bool, object, string } from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';

class WithLabel extends React.Component {
  static propTypes = {
    children: any,
    label: string
  };

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
    prev3Text: '<No Event>'
  };

  updateText = text => {
    this.setState(state => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text
      };
    });
  };

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => this.updateText('onBlur')}
          onChange={event => this.updateText('onChange text: ' + event.nativeEvent.text)}
          onEndEditing={event => this.updateText('onEndEditing text: ' + event.nativeEvent.text)}
          onFocus={() => this.updateText('onFocus')}
          onKeyPress={event => {
            this.updateText('onKeyPress key: ' + event.nativeEvent.key);
          }}
          onSelectionChange={event =>
            this.updateText(
              'onSelectionChange range: ' +
                event.nativeEvent.selection.start +
                ',' +
                event.nativeEvent.selection.end
            )}
          onSubmitEditing={event =>
            this.updateText('onSubmitEditing text: ' + event.nativeEvent.text)}
          placeholder="Enter text to see events"
          style={[styles.default, { maxWidth: 200 }]}
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
      text:
        'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0
    };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChangeText={text => {
          this.setState({ text });
        }}
        onContentSizeChange={event => {
          this.setState({ height: event.nativeEvent.contentSize.height });
        }}
        style={[styles.default, { height: Math.max(35, this.state.height) }]}
        value={this.state.text}
      />
    );
  }
}

class RewriteExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const limit = 20;
    const remainder = limit - this.state.text.length;
    const remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          maxLength={limit}
          multiline={false}
          onChangeText={text => {
            text = text.replace(/ /g, '_');
            this.setState({ text });
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, { color: remainderColor }]}>
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
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          onChangeText={text => {
            this.setState({ text: text.replace(/\s/g, '') });
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
    this.state = { text: 'Hello #World' };
  }

  render() {
    //define delimiter
    const delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index;
    const parts = [];
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
          multiline={true}
          onChangeText={text => {
            this.setState({ text });
          }}
          style={styles.multiline}
          value={parts.join('')}
        />
      </View>
    );
  }
}

class BlurOnSubmitExample extends React.Component {
  constructor(props) {
    super(props);
    this._nodes = {};
  }

  focusNextField = nextField => {
    this._nodes[nextField].focus();
  };

  render() {
    return (
      <View>
        <TextInput
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
          placeholder="blurOnSubmit = false"
          ref={c => {
            this._nodes['1'] = c;
          }}
          returnKeyType="next"
          style={styles.default}
        />
        <TextInput
          blurOnSubmit={false}
          keyboardType="email-address"
          onSubmitEditing={() => this.focusNextField('3')}
          placeholder="blurOnSubmit = false"
          ref={c => {
            this._nodes['2'] = c;
          }}
          returnKeyType="next"
          style={styles.default}
        />
        <TextInput
          blurOnSubmit={false}
          keyboardType="url"
          onSubmitEditing={() => this.focusNextField('4')}
          placeholder="blurOnSubmit = false"
          ref={c => {
            this._nodes['3'] = c;
          }}
          returnKeyType="next"
          style={styles.default}
        />
        <TextInput
          blurOnSubmit={false}
          keyboardType="numeric"
          onSubmitEditing={() => this.focusNextField('5')}
          placeholder="blurOnSubmit = false"
          ref={c => {
            this._nodes['4'] = c;
          }}
          style={styles.default}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="blurOnSubmit = true"
          ref={c => {
            this._nodes['5'] = c;
          }}
          returnKeyType="done"
          style={styles.default}
        />
      </View>
    );
  }
}

type SelectionExampleState = {
  selection: {
    start: number,
    end?: number
  },
  value: string
};

class SelectionExample extends React.Component {
  state: SelectionExampleState;

  _textInput: any;

  static propTypes = {
    multiline: bool,
    style: object,
    value: string
  };

  constructor(props) {
    super(props);
    this.state = {
      selection: { start: 0, end: 0 },
      value: props.value
    };
  }

  onSelectionChange({ nativeEvent: { selection } }) {
    this.setState({ selection });
  }

  getRandomPosition() {
    const length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select(start, end) {
    this._textInput.focus();
    this.setState({ selection: { start, end } });
  }

  selectRandom() {
    const positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions);
  }

  placeAt(position) {
    this.select(position, position);
  }

  placeAtRandom() {
    this.placeAt(this.getRandomPosition());
  }

  render() {
    const length = this.state.value.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={value => this.setState({ value })}
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

const styles = StyleSheet.create({
  page: {
    paddingBottom: 300
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60
  },
  multilineChild: {
    width: 50,
    height: 40,
    position: 'absolute',
    right: 5,
    backgroundColor: 'red'
  },
  eventLabel: {
    margin: 3,
    fontSize: 12
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2
  },
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  remainder: {
    textAlign: 'right',
    width: 24
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold'
  }
});

const examples = [
  {
    title: 'Auto-focus',
    render() {
      return (
        <View>
          <TextInput
            accessibilityLabel="I am the accessibility label for text input"
            autoFocus={true}
            style={styles.default}
          />
        </View>
      );
    }
  },
  {
    title: "Live Re-Write (<sp>  ->  '_') + maxLength",
    render() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Live Re-Write (no spaces allowed)',
    render() {
      return <RewriteExampleInvalidCharacters />;
    }
  },
  {
    title: 'Auto-capitalize',
    render() {
      return (
        <View>
          <WithLabel label="none">
            <TextInput autoCapitalize="none" style={styles.default} />
          </WithLabel>
          <WithLabel label="sentences">
            <TextInput autoCapitalize="sentences" style={styles.default} />
          </WithLabel>
          <WithLabel label="words">
            <TextInput autoCapitalize="words" style={styles.default} />
          </WithLabel>
          <WithLabel label="characters">
            <TextInput autoCapitalize="characters" style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Auto-correct',
    render() {
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
    render() {
      const keyboardTypes = [
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
        'numeric'
      ];
      const examples = keyboardTypes.map(type => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput keyboardType={type} style={styles.default} />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Keyboard appearance',
    render() {
      const keyboardAppearance = ['default', 'light', 'dark'];
      const examples = keyboardAppearance.map(type => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput keyboardAppearance={type} style={styles.default} />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Return key types',
    render() {
      const returnKeyTypes = [
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
        'emergency-call'
      ];
      const examples = returnKeyTypes.map(type => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput returnKeyType={type} style={styles.default} />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Enable return key automatically',
    render() {
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
    render() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput defaultValue="abc" secureTextEntry={true} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Event handling',
    render(): React.Element<any> {
      return <TextEventsExample />;
    }
  },
  {
    title: 'Colored input text',
    render() {
      return (
        <View>
          <TextInput defaultValue="Blue" style={[styles.default, { color: 'blue' }]} />
          <TextInput defaultValue="Green" style={[styles.default, { color: 'green' }]} />
        </View>
      );
    }
  },
  {
    title: 'Colored highlight/cursor for text input',
    render() {
      return (
        <View>
          <TextInput defaultValue="Highlight me" selectionColor={'green'} style={styles.default} />
          <TextInput
            defaultValue="Highlight me"
            selectionColor={'rgba(86, 76, 205, 1)'}
            style={styles.default}
          />
        </View>
      );
    }
  },
  {
    title: 'Clear button mode',
    render() {
      return (
        <View>
          <WithLabel label="never">
            <TextInput clearButtonMode="never" style={styles.default} />
          </WithLabel>
          <WithLabel label="while editing">
            <TextInput clearButtonMode="while-editing" style={styles.default} />
          </WithLabel>
          <WithLabel label="unless editing">
            <TextInput clearButtonMode="unless-editing" style={styles.default} />
          </WithLabel>
          <WithLabel label="always">
            <TextInput clearButtonMode="always" style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Clear and select',
    render() {
      return (
        <View>
          <WithLabel label="clearTextOnFocus">
            <TextInput
              clearTextOnFocus={true}
              defaultValue="text is cleared on focus"
              placeholder="text is cleared on focus"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="selectTextOnFocus">
            <TextInput
              defaultValue="text is selected on focus"
              placeholder="text is selected on focus"
              selectTextOnFocus={true}
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Blur on submit',
    render(): React.Element<any> {
      return <BlurOnSubmitExample />;
    }
  },
  {
    title: 'Multiline blur on submit',
    render() {
      return (
        <View>
          <TextInput
            blurOnSubmit={true}
            multiline={true}
            onSubmitEditing={event => {
              console.log(event.nativeEvent.text);
            }}
            placeholder="blurOnSubmit = true"
            returnKeyType="next"
            style={styles.multiline}
          />
        </View>
      );
    }
  },
  {
    title: 'Multiline',
    render() {
      return (
        <View>
          <TextInput multiline={true} placeholder="multiline text input" style={styles.multiline} />
          <TextInput
            autoCapitalize="words"
            autoCorrect={true}
            clearTextOnFocus={true}
            keyboardType="url"
            multiline={true}
            placeholder="multiline text input with font styles and placeholder"
            placeholderTextColor="red"
            style={[styles.multiline, styles.multilineWithFontStyles]}
          />
          <TextInput
            maxLength={5}
            multiline={true}
            placeholder="multiline text input with max length"
            style={styles.multiline}
          />
          <TextInput
            editable={false}
            multiline={true}
            placeholder="uneditable multiline text input"
            style={styles.multiline}
          />
          <TextInput
            dataDetectorTypes="phoneNumber"
            defaultValue="uneditable multiline text input with phone number detection: 88888888."
            editable={false}
            multiline={true}
            style={styles.multiline}
          />
        </View>
      );
    }
  },
  {
    title: 'Number of lines',
    render() {
      return (
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[styles.multiline, { height: 'auto' }]}
          />
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render() {
      return (
        <View>
          <AutoExpandingTextInput
            enablesReturnKeyAutomatically={true}
            placeholder="height increases with content"
            returnKeyType="default"
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Text selection & cursor placement',
    render() {
      return (
        <View>
          <SelectionExample style={styles.default} value="text selection can be changed" />
          <SelectionExample
            multiline
            style={styles.multiline}
            value={'multiline text selection\ncan also be changed'}
          />
        </View>
      );
    }
  },
  {
    title: 'TextInput maxLength',
    render() {
      return (
        <View>
          <WithLabel label="maxLength: 5">
            <TextInput maxLength={5} style={styles.default} />
          </WithLabel>
          <WithLabel label="maxLength: 5 with placeholder">
            <TextInput maxLength={5} placeholder="ZIP code entry" style={styles.default} />
          </WithLabel>
          <WithLabel label="maxLength: 5 with default value already set">
            <TextInput defaultValue="94025" maxLength={5} style={styles.default} />
          </WithLabel>
          <WithLabel label="maxLength: 5 with very long default value already set">
            <TextInput defaultValue="9402512345" maxLength={5} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  }
];

storiesOf('Components', module).add('TextInput', () =>
  <UIExplorer
    examples={examples}
    title="TextInput"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/TextInput.md"
  />
);
