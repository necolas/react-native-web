/**
 * @flow
 */

import * as helpers from '../helpers';
import { oneOf } from 'prop-types';
import sources from '../sources';
import React, { PureComponent } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

class NetworkImageExample extends PureComponent {
  state = {
    error: false,
    loading: false
  };

  static propTypes = {
    logMethod: oneOf(['onError', 'onLoad', 'onLoadEnd', 'onLoadStart']),
    source: Image.propTypes.source
  };

  static defaultProps = {
    logList: []
  };

  render() {
    const loader = this.state.loading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;

    return (
      <View>
        <Image
          defaultSource={sources.placeholder}
          onError={this._handleError}
          onLoad={this._handleLoad}
          onLoadEnd={this._handleLoadEnd}
          onLoadStart={this._handleLoadStart}
          source={this.props.source}
          style={helpers.styles.base}
        >
          {loader}
        </Image>
        {this.state.message && <Text style={helpers.styles.marginTop}>{this.state.message}</Text>}
      </View>
    );
  }

  _handleError = e => {
    const nextState = { loading: false };
    if (this.props.logMethod === 'onError') {
      nextState.message = `✘ onError ${JSON.stringify(e.nativeEvent)}`;
    }
    this.setState(() => nextState);
  };

  _handleLoad = () => {
    const nextState = { loading: false };
    if (this.props.logMethod === 'onLoad') {
      nextState.message = '✔ onLoad';
    }
    this.setState(() => nextState);
  };

  _handleLoadEnd = () => {
    const nextState = { loading: false };
    if (this.props.logMethod === 'onLoadEnd') {
      nextState.message = '✔ onLoadEnd';
    }
    this.setState(() => nextState);
  };

  _handleLoadStart = () => {
    const nextState = { loading: true };
    if (this.props.logMethod === 'onLoadStart') {
      nextState.message = '✔ onLoadStart';
    }
    this.setState(() => nextState);
  };
}

export default NetworkImageExample;
