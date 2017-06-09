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
import UIExplorer from '../../UIExplorer';

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
        <ProgressBar color="#794BC4" progress={this.getProgress(0.2)} style={styles.progressView} />
      </View>
    );
  }
});

const examples = [
  {
    title: 'Default',
    render() {
      return <ProgressBar progress={0.5} />;
    }
  },
  {
    title: 'Controlled',
    render() {
      return <ProgressBarExample />;
    }
  },
  {
    title: 'Indeterminate',
    render() {
      return <ProgressBar indeterminate style={styles.progressView} trackColor="#D1E3F6" />;
    }
  },
  {
    title: 'Custom colors',
    render() {
      return (
        <View>
          <ProgressBar color="#1DA1F2" progress={1} />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#17BF63" progress={0.8} />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#F45D22" progress={0.6} />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#794BC4" progress={0.4} />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#E0245E" progress={0.2} />
        </View>
      );
    }
  },
  {
    title: 'Custom track colors',
    render() {
      return (
        <View>
          <ProgressBar color="#1DA1F2" progress={0.1} trackColor="#D1E3F6" />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#1DA1F2" progress={0.2} trackColor="rgba(121, 74, 196, 0.34)" />
          <View style={styles.verticalDivider} />
          <ProgressBar color="#1DA1F2" progress={0.3} trackColor="rgba(224, 36, 94, 0.35)" />
        </View>
      );
    }
  },
  {
    title: 'Custom sizes',
    render() {
      return (
        <View>
          <ProgressBar
            color="#1DA1F2"
            progress={0.33}
            style={{ height: 10 }}
            trackColor="#D1E3F6"
          />
          <View style={styles.verticalDivider} />
          <ProgressBar
            color="#1DA1F2"
            progress={0.33}
            style={{ height: 15 }}
            trackColor="#D1E3F6"
          />
        </View>
      );
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
  },
  verticalDivider: {
    height: '1.3125rem'
  }
});

storiesOf('Components', module).add('ProgressBar', () =>
  <UIExplorer
    description="Display an activity progress bar"
    examples={examples}
    title="ProgressBar"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/ProgressBar.md"
  />
);
