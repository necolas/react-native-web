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
    loading: false,
    messages: []
  };

  static propTypes = {
    logMethod: oneOf(['onError', 'onLoad', 'onLoadEnd', 'onLoadStart', 'onProgress']),
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
        {loader}
        <Image
          defaultSource={sources.placeholder}
          onError={this._handleError}
          onLoad={this._handleLoad}
          onLoadEnd={this._handleLoadEnd}
          onLoadStart={this._handleLoadStart}
          onProgress={this._handleProgress}
          source={this.props.source}
          style={helpers.styles.base}
        />
        {this.state.messages.map((message, index) => {
          return (
            <Text key={index} style={helpers.styles.marginTop}>
              {message}
            </Text>
          );
        })}
      </View>
    );
  }

  _handleError = e => {
    this.setState(state => {
      const messages = [...state.messages];
      if (this.props.logMethod === 'onError') {
        messages.push(`✘ onError ${JSON.stringify(e.nativeEvent)}`);
      }

      return {
        loading: false,
        messages
      };
    });
  };

  _handleLoad = () => {
    this.setState(state => {
      const messages = [...state.messages];
      if (this.props.logMethod === 'onLoad') {
        messages.push('✔ onLoad');
      }

      return {
        loading: false,
        messages
      };
    });
  };

  _handleLoadEnd = () => {
    this.setState(state => {
      const messages = [...state.messages];
      if (this.props.logMethod === 'onLoadEnd') {
        messages.push('✔ onLoadEnd');
      }

      return {
        loading: false,
        messages
      };
    });
  };

  _handleLoadStart = () => {
    this.setState(state => {
      const messages = [...state.messages];
      if (this.props.logMethod === 'onLoadStart') {
        messages.push('✔ onLoadStart');
      }

      return {
        loading: false,
        messages
      };
    });
  };

  _handleProgress = e => {
    this.setState(state => {
      const messages = [...state.messages];
      if (this.props.logMethod === 'onProgress') {
        const { loaded, total } = e.nativeEvent;
        messages.push(
          `✔ onProgress ${JSON.stringify({
            loaded,
            total
          })}`
        );
      }

      return {
        messages
      };
    });
  };
}

export default NetworkImageExample;
