import { Platform, Switch, Text, View } from 'react-native'
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

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

var BasicSwitchExample = React.createClass({
  getInitialState() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  render() {
    return (
      <View>
        <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 10}}
          value={this.state.falseSwitchIsOn}
        />
        <Switch
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          value={this.state.trueSwitchIsOn}
        />
      </View>
    );
  }
});

var DisabledSwitchExample = React.createClass({
  render() {
    return (
      <View>
        <Switch
          disabled={true}
          style={{marginBottom: 10}}
          value={true} />
        <Switch
          disabled={true}
          value={false} />
      </View>
    );
  },
});

var ColorSwitchExample = React.createClass({
  getInitialState() {
    return {
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false,
    };
  },
  render() {
    return (
      <View>
        <Switch
          activeThumbColor="#428bca"
          activeTrackColor="#A0C4E3"
          onValueChange={(value) => this.setState({colorFalseSwitchIsOn: value})}
          style={{marginBottom: 10}}
          value={this.state.colorFalseSwitchIsOn}
        />
        <Switch
          activeThumbColor="#5CB85C"
          activeTrackColor="#ADDAAD"
          onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
          thumbColor="#EBA9A7"
          trackColor="#D9534F"
          value={this.state.colorTrueSwitchIsOn}
        />
      </View>
    );
  },
});

var EventSwitchExample = React.createClass({
  getInitialState() {
    return {
      eventSwitchIsOn: false,
      eventSwitchRegressionIsOn: true,
    };
  },
  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <Switch
            onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
            style={{marginBottom: 10}}
            value={this.state.eventSwitchIsOn} />
          <Switch
            onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
            style={{marginBottom: 10}}
            value={this.state.eventSwitchIsOn} />
          <Text>{this.state.eventSwitchIsOn ? 'On' : 'Off'}</Text>
        </View>
        <View>
          <Switch
            onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
            style={{marginBottom: 10}}
            value={this.state.eventSwitchRegressionIsOn} />
          <Switch
            onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
            style={{marginBottom: 10}}
            value={this.state.eventSwitchRegressionIsOn} />
          <Text>{this.state.eventSwitchRegressionIsOn ? 'On' : 'Off'}</Text>
        </View>
      </View>
    );
  }
});

var SizeSwitchExample = React.createClass({
  getInitialState() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  render() {
    return (
      <View>
        <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 10, height: '3rem' }}
          value={this.state.falseSwitchIsOn}
        />
        <Switch
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          style={{marginBottom: 10, width: 150 }}
          value={this.state.trueSwitchIsOn}
        />
      </View>
    );
  }
});

var examples = [
  {
    title: 'set to true or false',
    render(): ReactElement<any> { return <BasicSwitchExample />; }
  },
  {
    title: 'disabled',
    render(): ReactElement<any> { return <DisabledSwitchExample />; }
  },
  {
    title: 'change events',
    render(): ReactElement<any> { return <EventSwitchExample />; }
  },
  {
    title: 'custom colors',
    render(): ReactElement<any> { return <ColorSwitchExample />; }
  },
  {
    title: 'custom size',
    render(): ReactElement<any> { return <SizeSwitchExample />; }
  },
  {
    title: 'controlled component',
    render(): ReactElement<any> { return <Switch />; }
  }
];

examples.forEach((example) => {
  storiesOf('component: Switch', module)
    .add(example.title, () => example.render())
})
