/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import sources from '../sources';
import React, { PureComponent } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

class ImagePrefetchExample extends PureComponent {
  static propTypes = {
    source: Image.propTypes.source
  };

  state = {
    events: [],
    showButton: true,
    startLoad: false
  };

  render() {
    const { showButton, startLoad } = this.state;

    return (
      <View>
        {showButton ? (
          <View style={styles.button}>
            <Button onPress={this._handlePress} title="Prefetch image" />
          </View>
        ) : null}
        {startLoad ? (
          <View>
            <Text>{this.state.events.join('\n')}</Text>
            <Image
              onLoad={this._handleLoad}
              onLoadEnd={this._handleLoadEnd}
              onLoadStart={this._handleLoadStart}
              source={this.props.source}
              style={styles.image}
            />
          </View>
        ) : null}
      </View>
    );
  }

  _handleLoad = () => {
    const startTime = this._startTime;
    this._loadEventFired(`✔ (prefetched) onLoad (+${Date.now() - startTime}ms)`);
  };

  _handleLoadEnd = () => {
    const startTime = this._startTime;
    this._loadEventFired(`✔ (prefetched) onLoadEnd (+${Date.now() - startTime}ms)`);
  };

  _handleLoadStart = () => {
    const startTime = this._startTime;
    this._loadEventFired(`✔ (prefetched) onLoadStart (+${Date.now() - startTime}ms)`);
  };

  _handlePress = () => {
    this._startTime = this._startTime || Date.now();

    Image.prefetch(createUncachedURI(this.props.source.uri)).then(
      () => {
        this._loadEventFired('✔ Prefetch OK');
        this.setState(() => ({ startLoad: true }));
      },
      error => {
        this._loadEventFired(`✘ Prefetch failed (+${Date.now() - this._startTime}ms)`);
        console.log(error);
      }
    );
  };

  _loadEventFired = event => {
    this.setState(state => ({ events: [...state.events, event], showButton: false }));
  };
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 300
  },
  image: {
    backgroundColor: '#eee',
    height: 150,
    marginTop: 10,
    width: 150
  }
});

const StaticPrefetchExample = () => <ImagePrefetchExample source={sources.prefetchable} />;

export default StaticPrefetchExample;
