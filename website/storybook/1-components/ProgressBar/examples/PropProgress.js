/**
 * @flow
 */

import { DividerVertical } from '../helpers';
import React, { PureComponent } from 'react';
import { ProgressBar, StyleSheet, View } from 'react-native';

class ProgressBarProgressExample extends PureComponent {
  state = { progress: 0 };

  componentDidMount() {
    this._updateProgress();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._frame);
  }

  render() {
    return (
      <View>
        <ProgressBar color="#794BC4" progress={0.2} style={styles.progress} />
        <DividerVertical />
        <ProgressBar color="#794BC4" progress={this._getProgress(0.2)} style={styles.progress} />
      </View>
    );
  }

  _getProgress(offset) {
    const progress = this.state.progress + offset;
    return Math.sin(progress % Math.PI) % 1;
  }

  _updateProgress() {
    const progress = this.state.progress + 0.01;
    this.setState(() => ({ progress }));
    this._frame = window.requestAnimationFrame(() => this._updateProgress());
  }
}

const styles = StyleSheet.create({
  progress: {
    minWidth: 200
  }
});

export default ProgressBarProgressExample;
