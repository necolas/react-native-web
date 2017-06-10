/* eslint-disable react/jsx-no-bind, react/prefer-es6-class, react/prop-types */

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
import UIExplorer from '../../UIExplorer';
import { storiesOf } from '@kadira/storybook';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const base64Icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
const dataSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg>';

const IMAGE_PREFETCH_URL = 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now();
const prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);

class NetworkImageCallbackExample extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      events: [],
      startLoadPrefetched: false,
      mountTime: new Date()
    };
  }

  componentWillMount() {
    this.setState({ mountTime: new Date() });
  }

  render() {
    const { mountTime } = this.state;

    return (
      <View>
        <Image
          onLoad={() => this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms)`)}
          onLoadEnd={() => {
            this._loadEventFired(`✔ onLoadEnd (+${new Date() - mountTime}ms)`);
            this.setState({ startLoadPrefetched: true }, () => {
              prefetchTask.then(
                () => {
                  this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms)`);
                },
                error => {
                  this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms)`);
                  console.log(error);
                }
              );
            });
          }}
          onLoadStart={() => this._loadEventFired(`✔ onLoadStart (+${new Date() - mountTime}ms)`)}
          source={this.props.source}
          style={[styles.base, { overflow: 'visible' }]}
        />
        {this.state.startLoadPrefetched
          ? <Image
              onLoad={() =>
                this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`)}
              onLoadEnd={() =>
                this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`)}
              onLoadStart={() =>
                this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms)`)}
              source={this.props.prefetchedSource}
              style={[styles.base, { overflow: 'visible' }]}
            />
          : null}
        <Text style={{ marginTop: 20 }}>
          {this.state.events.join('\n')}
        </Text>
      </View>
    );
  }

  _loadEventFired = event => {
    this.setState(state => (state.events = [...state.events, event]));
  };
}

class NetworkImageExample extends React.Component {
  state = {
    error: false,
    loading: false,
    progress: 0
  };

  render() {
    const loader = this.state.loading
      ? <View style={styles.progress}>
          <Text>{this.state.progress}%</Text>
          <ActivityIndicator style={{ marginLeft: 5 }} />
        </View>
      : null;
    return this.state.error
      ? <Text>{this.state.error}</Text>
      : <Image
          onError={e => this.setState({ error: e.nativeEvent.error, loading: false })}
          onLoad={() => this.setState({ loading: false, error: false })}
          onLoadStart={e => this.setState({ loading: true })}
          onProgress={e =>
            this.setState({
              progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)
            })}
          source={this.props.source}
          style={[styles.base, { overflow: 'visible' }]}
        >
          {loader}
        </Image>;
  }
}

class ImageSizeExample extends React.Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({ width, height });
    });
  }

  render() {
    return (
      <View>
        <Text>
          Actual dimensions:{'\n'}
          width: {this.state.width}, height: {this.state.height}
        </Text>
        <Image
          source={this.props.source}
          style={{
            backgroundColor: '#eee',
            height: 227,
            marginTop: 10,
            width: 323
          }}
        />
      </View>
    );
  }
}

/*
var MultipleSourcesExample = createReactClass({
  getInitialState: function() {
    return {
      width: 30,
      height: 30,
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={styles.touchableText}
            onPress={this.decreaseImageSize} >
            Decrease image size
          </Text>
          <Text
            style={styles.touchableText}
            onPress={this.increaseImageSize} >
            Increase image size
          </Text>
        </View>
        <Text>Container image size: {this.state.width}x{this.state.height} </Text>
        <View
          style={[styles.imageContainer, {height: this.state.height, width: this.state.width}]} >
          <Image
            style={{flex: 1}}
            source={[
              {uri: 'http://facebook.github.io/react/img/logo_small.png', width: 38, height: 38},
              {uri: 'http://facebook.github.io/react/img/logo_small_2x.png', width: 76, height: 76},
              {uri: 'http://facebook.github.io/react/img/logo_og.png', width: 400, height: 400}
            ]}
          />
        </View>
      </View>
    );
  },
  increaseImageSize: function() {
    if (this.state.width >= 100) {
      return;
    }
    this.setState({
      width: this.state.width + 10,
      height: this.state.height + 10,
    });
  },
  decreaseImageSize: function() {
    if (this.state.width <= 10) {
      return;
    }
    this.setState({
      width: this.state.width - 10,
      height: this.state.height - 10,
    });
  },
});
*/

const examples = [
  {
    title: 'Plain network image',
    description:
      'If the `source` prop `uri` property is prefixed with ' +
        '"http", then it will be downloaded from the network.',
    render: function() {
      return (
        <Image
          source={{
            uri: 'http://facebook.github.io/react/img/logo_og.png',
            width: 1200,
            height: 630
          }}
          style={styles.base}
        />
      );
    }
  },
  {
    title: 'Plain static image',
    description:
      'Static assets should be placed in the source code tree, and ' +
        'required in the same way as JavaScript modules.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={require('./uie_thumb_normal@2x.png')} style={styles.icon} />
          <Image source={require('./uie_thumb_selected@2x.png')} style={styles.icon} />
          {/*<Image source={require('./uie_comment_normal.png')} style={styles.icon} />*/}
          {/*<Image source={require('./uie_comment_highlighted.png')} style={styles.icon} />*/}
        </View>
      );
    }
  },
  {
    title: 'Image loading events',
    render() {
      return (
        <NetworkImageCallbackExample
          prefetchedSource={{ uri: IMAGE_PREFETCH_URL }}
          source={{ uri: 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now() }}
        />
      );
    }
  },
  {
    title: 'Error handler',
    render() {
      return (
        <NetworkImageExample
          source={{ uri: 'http://TYPO_ERROR_facebook.github.io/react/img/logo_og.png' }}
        />
      );
    }
  },
  {
    title: 'defaultSource',
    description: 'Show a placeholder image when a network image is loading',
    render() {
      return (
        <Image
          defaultSource={require('./bunny.png')}
          source={{ uri: 'http://facebook.github.io/origami/public/images/birds.jpg' }}
          style={styles.base}
        />
      );
    }
  },
  {
    title: 'Border color',
    render() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {
                borderColor: '#f099f0',
                borderWidth: 3
              }
            ]}
          />
        </View>
      );
    }
  },
  {
    title: 'Border width',
    render() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {
                borderColor: '#f099f0',
                borderWidth: 5
              }
            ]}
          />
        </View>
      );
    }
  },
  {
    title: 'Border radius',
    render() {
      return (
        <View style={styles.horizontal}>
          <Image source={fullImage} style={[styles.base, { borderRadius: 5 }]} />
          <Image
            source={fullImage}
            style={[styles.base, styles.leftMargin, { borderRadius: 19 }]}
          />
        </View>
      );
    }
  },
  {
    title: 'Background color',
    render() {
      return (
        <View style={styles.horizontal}>
          <Image source={smallImage} style={styles.base} />
          <Image
            source={smallImage}
            style={[styles.base, styles.leftMargin, { backgroundColor: 'rgba(0, 0, 100, 0.25)' }]}
          />
          <Image
            source={smallImage}
            style={[styles.base, styles.leftMargin, { backgroundColor: 'red' }]}
          />
          <Image
            source={smallImage}
            style={[styles.base, styles.leftMargin, { backgroundColor: 'black' }]}
          />
        </View>
      );
    }
  },
  {
    title: 'Opacity',
    render() {
      return (
        <View style={styles.horizontal}>
          <Image source={fullImage} style={[styles.base, { opacity: 1 }]} />
          <Image source={fullImage} style={[styles.base, styles.leftMargin, { opacity: 0.8 }]} />
          <Image source={fullImage} style={[styles.base, styles.leftMargin, { opacity: 0.6 }]} />
          <Image source={fullImage} style={[styles.base, styles.leftMargin, { opacity: 0.4 }]} />
          <Image source={fullImage} style={[styles.base, styles.leftMargin, { opacity: 0.2 }]} />
          <Image source={fullImage} style={[styles.base, styles.leftMargin, { opacity: 0 }]} />
        </View>
      );
    }
  },
  {
    title: 'Nesting',
    render() {
      return (
        <Image source={fullImage} style={{ width: 60, height: 60, backgroundColor: 'transparent' }}>
          <Text style={styles.nestedText}>
            React
          </Text>
        </Image>
      );
    }
  },
  {
    title: 'Resize mode',
    description: 'The `resizeMode` style prop controls how the image is rendered within the frame.',
    render() {
      return (
        <View>
          {[smallImage, fullImage].map((image, index) => {
            return (
              <View key={index}>
                <View style={styles.horizontal}>
                  <View>
                    <Text style={[styles.resizeModeText]}>
                      Contain
                    </Text>
                    <Image
                      resizeMode={Image.resizeMode.contain}
                      source={image}
                      style={styles.resizeMode}
                    />
                  </View>
                  <View style={styles.leftMargin}>
                    <Text style={[styles.resizeModeText]}>
                      Cover
                    </Text>
                    <Image
                      resizeMode={Image.resizeMode.cover}
                      source={image}
                      style={styles.resizeMode}
                    />
                  </View>
                </View>
                <View style={styles.horizontal}>
                  <View>
                    <Text style={[styles.resizeModeText]}>
                      Stretch
                    </Text>
                    <Image
                      resizeMode={Image.resizeMode.stretch}
                      source={image}
                      style={styles.resizeMode}
                    />
                  </View>
                  <View style={styles.leftMargin}>
                    <Text style={[styles.resizeModeText]}>
                      Repeat
                    </Text>
                    <Image resizeMode={'repeat'} source={image} style={styles.resizeMode} />
                  </View>
                  <View style={styles.leftMargin}>
                    <Text style={[styles.resizeModeText]}>
                      Center
                    </Text>
                    <Image resizeMode={'center'} source={image} style={styles.resizeMode} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  },
  {
    title: 'Animated GIF',
    render() {
      return (
        <Image
          source={{
            uri:
              'http://38.media.tumblr.com/9e9bd08c6e2d10561dd1fb4197df4c4e/tumblr_mfqekpMktw1rn90umo1_500.gif'
          }}
          style={styles.gif}
        />
      );
    }
  },
  {
    title: 'Base64 image',
    render() {
      return <Image source={{ uri: base64Icon, scale: 3 }} style={styles.base64} />;
    }
  },
  {
    title: 'Data SVG',
    render() {
      return <Image source={{ uri: dataSvg, scale: 3 }} style={styles.base64} />;
    }
  },
  {
    title: 'Image dimensions',
    description:
      '`Image.getSize` provides the dimensions of an image as soon as they are available (i.e., before loading is complete)',
    render() {
      return (
        <ImageSizeExample
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Chestnut-mandibled_Toucan.jpg'
          }}
        />
      );
    }
  }
];

const fullImage = { uri: 'http://facebook.github.io/react/img/logo_og.png' };
const smallImage = { uri: 'http://facebook.github.io/react/img/logo_small_2x.png' };

const styles = StyleSheet.create({
  base: {
    height: 38,
    width: 38
  },
  progress: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6
  },
  nestedText: {
    backgroundColor: 'transparent',
    color: 'white',
    marginLeft: 12,
    marginTop: 20
  },
  resizeMode: {
    borderColor: 'black',
    borderWidth: 0.5,
    height: 60,
    width: 90
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3
  },
  icon: {
    height: 15,
    width: 15
  },
  horizontal: {
    flexDirection: 'row'
  },
  gif: {
    flex: 1,
    height: 200
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain'
  },
  touchableText: {
    color: 'blue',
    fontWeight: '500'
  }
});

storiesOf('Components', module).add('Image', () =>
  <UIExplorer
    description="An accessibile image component with support for image resizing, default image, and child content."
    examples={examples}
    title="Image"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/Image.md"
  />
);
