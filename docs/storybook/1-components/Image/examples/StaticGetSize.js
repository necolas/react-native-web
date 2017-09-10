/**
 * @flow
 */

import { createUncachedURI } from '../helpers';
import sources from '../sources';
import React, { PureComponent } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

class ImageGetSizeExample extends PureComponent {
  static propTypes = {
    source: Image.propTypes.source
  };

  state = {
    showButton: true,
    startLoad: false,
    width: 0,
    height: 0
  };

  render() {
    const { showButton, startLoad } = this.state;

    return (
      <View>
        {showButton ? (
          <View style={styles.button}>
            <Button onPress={this._handlePress} title="(4.7MB) Get image dimensions" />
          </View>
        ) : null}
        {startLoad ? (
          <View>
            <Text>
              Source dimensions:{' '}
              {JSON.stringify({ width: this.state.width, height: this.state.height })}
            </Text>
            <Image source={createUncachedURI(this.props.source.uri)} style={styles.image} />
          </View>
        ) : null}
      </View>
    );
  }

  _handlePress = () => {
    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({ startLoad: true, showButton: false, width, height });
    });
  };
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 300
  },
  image: {
    backgroundColor: '#eee',
    height: 227,
    marginTop: 10,
    width: 323
  }
});

const StaticGetSizeExample = () => <ImageGetSizeExample source={sources.huge} />;

export default StaticGetSizeExample;
