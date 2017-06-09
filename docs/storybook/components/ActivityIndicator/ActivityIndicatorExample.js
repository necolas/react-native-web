/* eslint-disable react/prefer-es6-class, react/prop-types */

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

import createReactClass from 'create-react-class';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimerMixin from 'react-timer-mixin';
import UIExplorer from '../../UIExplorer';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ToggleAnimatingActivityIndicator = createReactClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      animating: true
    };
  },

  setToggleTimeout() {
    this.setTimeout(() => {
      this.setState({ animating: !this.state.animating });
      this.setToggleTimeout();
    }, 2000);
  },

  componentDidMount() {
    this.setToggleTimeout();
  },

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        hidesWhenStopped={this.props.hidesWhenStopped}
        size="large"
        style={styles.centering}
      />
    );
  }
});

const examples = [
  {
    title: 'Default',
    description: 'Renders small and blue',
    render() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicator />
        </View>
      );
    }
  },
  {
    title: 'Custom colors',
    description: 'Any color value is supported',
    render() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicator color="#1DA1F2" style={styles.rightPadding} />
          <ActivityIndicator color="#17BF63" style={styles.rightPadding} />
          <ActivityIndicator color="#F45D22" style={styles.rightPadding} />
          <ActivityIndicator color="#794BC4" style={styles.rightPadding} />
          <ActivityIndicator color="#E0245E" style={styles.rightPadding} />
          <ActivityIndicator color="#FFAD1F" style={styles.rightPadding} />
        </View>
      );
    }
  },
  {
    title: 'Custom sizes',
    description:
      'There are 2 predefined sizes: "small" and "large". The size can be further customized as a number (pixels) or using scale transforms',
    render() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicator size={20} style={styles.rightPadding} />
          <ActivityIndicator size="small" style={styles.rightPadding} />
          <ActivityIndicator size={36} style={styles.rightPadding} />
          <ActivityIndicator size="large" style={styles.rightPadding} />
          <ActivityIndicator size={60} style={styles.rightPadding} />
          <ActivityIndicator
            size="large"
            style={{ marginLeft: 20, transform: [{ scale: 1.75 }] }}
          />
        </View>
      );
    }
  },
  {
    title: 'Animation controls (start, pause, hide)',
    description: 'The animation can be paused, and the component hidden',
    render() {
      return (
        <View style={[styles.horizontal]}>
          <ToggleAnimatingActivityIndicator hidesWhenStopped={false} style={styles.rightPadding} />
          <ToggleAnimatingActivityIndicator />
        </View>
      );
    }
  }
];

const styles = StyleSheet.create({
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightPadding: {
    paddingRight: 10
  }
});

storiesOf('Components', module).add('ActivityIndicator', () =>
  <UIExplorer
    description="Displays a customizable activity indicator"
    examples={examples}
    title="ActivityIndicator"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/ActivityIndicator.md"
  />
);
