/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RNTesterApp
 * @flow
 */
import React from 'react';
import RNTesterActions from './RNTesterActions';
import RNTesterExampleContainer from './RNTesterExampleContainer';
import RNTesterExampleList from './RNTesterExampleList';
import RNTesterList from './RNTesterList';
import RNTesterNavigationReducer from './RNTesterNavigationReducer';
import URIActionMap from './URIActionMap';

import {
  AppRegistry,
  AsyncStorage,
  BackHandler,
  Button,
  Linking,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

import type { RNTesterExample } from './RNTesterList';
import type { RNTesterAction } from './RNTesterActions';
import type { RNTesterNavigationState } from './RNTesterNavigationReducer';

type Props = {
  exampleFromAppetizeParams: string,
};

const APP_STATE_KEY = 'RNTesterAppState.v2';

const Header = ({ onBack, title }: { onBack?: () => mixed, title: string }) => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.header}>
      <View style={styles.headerCenter}>
        <Text accessibilityRole="heading" aria-level="3" style={styles.title}>{title}</Text>
      </View>
      {onBack ? (
        <React.Fragment>
          <View style={styles.headerLeft}>
            <Button title="Back" onPress={onBack} />
          </View>
          <View style={styles.headerRight}>
          </View>
        </React.Fragment>
      ) : null}
    </View>
  </SafeAreaView>
);

class RNTesterApp extends React.Component<Props, RNTesterNavigationState> {
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      AsyncStorage.getItem(APP_STATE_KEY, (err, storedString) => {
        const exampleAction = URIActionMap(this.props.exampleFromAppetizeParams);
        const urlAction = URIActionMap(url);
        const launchAction = exampleAction || urlAction;
        if (err || !storedString) {
          const initialAction = launchAction || {type: 'InitialAction'};
          this.setState(RNTesterNavigationReducer(undefined, initialAction));
          return;
        }
        const storedState = JSON.parse(storedString);
        if (launchAction) {
          this.setState(RNTesterNavigationReducer(storedState, launchAction));
          return;
        }
        this.setState(storedState);
      });
    });

    Linking.addEventListener('url', (url) => {
      this._handleAction(URIActionMap(url));
    });
  }

  _handleBack = () => {
    this._handleAction(RNTesterActions.Back());
  }

  _handleAction = (action: ?RNTesterAction) => {
    if (!action) {
      return;
    }
    const newState = RNTesterNavigationReducer(this.state, action);
    if (this.state !== newState) {
      this.setState(
        newState,
        () => AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(this.state))
      );
    }
  }

  render() {
    if (!this.state) {
      return null;
    }
    if (this.state.openExample) {
      const Component = RNTesterList.Modules[this.state.openExample];
      if (Component.external) {
        return (
          <Component
            onExampleExit={this._handleBack}
          />
        );
      } else {
        return (
          <View style={styles.exampleContainer}>
            <Header onBack={this._handleBack} title={Component.title} />
            <RNTesterExampleContainer module={Component} />
          </View>
        );
      }

    }
    return (
      <View style={styles.exampleContainer}>
        <Header title="React Native" />
        {/* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This
          * comment suppresses an error when upgrading Flow's support for
          * React. To see the error delete this comment and run Flow. */}
        <RNTesterExampleList
          onNavigate={this._handleAction}
          list={RNTesterList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#96969A',
    backgroundColor: '#F5F5F6',
  },
  header: {
    padding: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50
  },
  headerCenter: {
    flex: 1,
    order: 2
  },
  headerLeft: {
    order: 1,
    width: 80
  },
  headerRight: {
    order: 3,
    width: 80
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  exampleContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('SetPropertiesExampleApp', () => require('./SetPropertiesExampleApp'));
AppRegistry.registerComponent('RootViewSizeFlexibilityExampleApp', () => require('./RootViewSizeFlexibilityExampleApp'));
AppRegistry.registerComponent('RNTesterApp', () => RNTesterApp);

// Register suitable examples for snapshot tests
RNTesterList.ComponentExamples.concat(RNTesterList.APIExamples).forEach((Example: RNTesterExample) => {
  const ExampleModule = Example.module;
  if (ExampleModule.displayName) {
    class Snapshotter extends React.Component<{}> {
      render() {
        return (
          <SnapshotViewIOS>
            <RNTesterExampleContainer module={ExampleModule} />
          </SnapshotViewIOS>
        );
      }
    }

    AppRegistry.registerComponent(ExampleModule.displayName, () => Snapshotter);
  }
});

module.exports = RNTesterApp;
