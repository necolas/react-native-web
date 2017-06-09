/* eslint-disable react/prefer-es6-class */

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
import { ProgressBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TimerMixin from 'react-timer-mixin';

const ProgressBarExample = createReactClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      progress: 0
    };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {
    const progress = this.state.progress + 0.01;
    this.setState({ progress });
    this.requestAnimationFrame(() => this.updateProgress());
  },

  getProgress(offset) {
    const progress = this.state.progress + offset;
    return Math.sin(progress % Math.PI) % 1;
  },

  render() {
    return (
      <View style={styles.container}>
        <ProgressBar color="purple" progress={this.getProgress(0.2)} style={styles.progressView} />
        <ProgressBar color="red" progress={this.getProgress(0.4)} style={styles.progressView} />
        <ProgressBar color="orange" progress={this.getProgress(0.6)} style={styles.progressView} />
        <ProgressBar color="yellow" progress={this.getProgress(0.8)} style={styles.progressView} />
      </View>
    );
  }
});

const examples = [
  {
    title: 'progress',
    render() {
      return <ProgressBarExample />;
    }
  },
  {
    title: 'indeterminate',
    render() {
      return <ProgressBar indeterminate style={styles.progressView} trackColor="#D1E3F6" />;
    }
  }
];

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    marginTop: -20,
    backgroundColor: 'transparent'
  },
  progressView: {
    marginTop: 20,
    minWidth: 200
  }
});

examples.forEach(example => {
  storiesOf('component: ProgressBar', module).add(example.title, () => example.render());
});
