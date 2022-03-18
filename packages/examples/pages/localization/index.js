/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @noflow
 */

/* eslint-disable no-use-before-define */

import React from 'react';
import {
  Button,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  Switch,
  View
} from 'react-native';
import Example from '../../shared/example';

const SCALE = PixelRatio.get();
const IMAGE_DIMENSION = 100 * SCALE;
const IMAGE_SIZE = [IMAGE_DIMENSION, IMAGE_DIMENSION];
const iconSource =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik0yNS44NjcsNDguODUzQzMyLjgwNiw1MC4xNzYsNDYuNDYsNTIuNSw2MS4yMTUsNTIuNWgwLjAwNWM5LjcxLDAsMTguNDAxLTEuMDU3LDI1LjkzOC0yLjkxMyAgIGMwLjE1OS0wLjA0NiwwLjM1LTAuMTM1LDAuNTY1LTAuMTg3YzAuMjgyLTAuMDcyLDAuNTY1LTAuMTY0LDAuODQ0LTAuMjM4YzMuMTg0LTAuOTY0LDIuNTc3LTMuMDUxLDIuMTk5LTMuODUyICAgYy00LjE2Ni03LjcxOS0xNS4wODYtMjMuNDE1LTM1LjAyOC0yMy40MTVjLTIyLjE2OSwwLTMwLjI2MiwxMC42MzUtMzMuMTQsMTkuNTg5QzIyLjU0NSw0Mi4zMzMsMjIuNDA3LDQ3LjEzNSwyNS44NjcsNDguODUzeiAgICBNMjguNjc2LDM4LjAzMmMwLjAxMy0wLjAzNiwwLjYxNC0xLjYyNiwxLjkyMy0xLjAwOGMxLjEzMywwLjUzNSwwLjk2MSwxLjU2MywwLjg4NywxLjg1Yy0wLjAwNywwLjAyNC0wLjAxNCwwLjA0OC0wLjAyMSwwLjA3MyAgIGMwLDAuMDAxLTAuMDAxLDAuMDA0LTAuMDAxLDAuMDA0bDAsMGMtMC4yNDksMC45MjktMC40MDQsMi4wODYtMC4wMTcsMi44NmMwLjE2LDAuMzE5LDAuNDkyLDAuNzY4LDEuNTQyLDAuOTg3bDAuMzY2LDAuMDc3ICAgYzIwLjgxNiw0LjM2LDM2LDIuOTMzLDQ1LjY3OCwwLjYyNmwtMC4wMDQsMC4wMDJjMCwwLDAuMDA1LTAuMDAyLDAuMDA3LTAuMDAzYzAuMjEyLTAuMDUsMC40MjEtMC4xMDEsMC42MjgtMC4xNTIgICBjMC41MDktMC4wNSwxLjE3MywwLjA3OCwxLjM5OSwxYzAuMzUxLDEuNDI0LTAuOTczLDEuODk1LTEuMjE3LDEuOTY5Yy01LjMyNSwxLjI3OS0xMi4yNjYsMi4zMDYtMjAuODM1LDIuMzA3ICAgYy03LjUwNSwwLTE2LjI1NS0wLjc4Ny0yNi4yNTctMi44ODJsLTAuMzY0LTAuMDc3Yy0yLjEyLTAuNDQyLTMuMTExLTEuNjMzLTMuNTY5LTIuNTU1QzI3Ljk4NSw0MS40MjEsMjguMjgxLDM5LjQxNiwyOC42NzYsMzguMDMyICAgeiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEwLjQ5MyIgY3k9IjIzLjQ1NSIgcj0iMC42MTkiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yLjA4LDI4LjMwOGMwLjY3Ni0wLjE3OCwwLjk4My0wLjM1MiwxLjE3NC0wLjVDNC42OSwyNi42OSw2LjUsMjcuNDgzLDcuNSwyOC4zNTd2MC4wMDJjMCwwLDEuNzExLDEuMjM1LDAuNzM3LDIuMjAyICAgYy0wLjk3NCwwLjk2NS0yLjMxOSwwLjAwNi0yLjMxOSwwLjAwNmwwLjAzNSwwLjAxNmMtMC4zMjctMC4yMDMtMC42LTAuNTYxLTAuNzgtMC41ODRjLTAuMzcsMC4yNi0wLjg3NiwwLjUtMS40NzYsMC41SDMuNyAgIGMwLDAtMS4zNDUsMC43MDksMC4xNzgsMS42NTJjMC4wMDEsMC4wMDEsMC4wMDIsMC4wNzIsMC4wMDQsMC4wNzNjMy45MzksMi4zNDIsOC4yNzEsNS43MDEsOC4yNzEsOC44OCAgIGMwLDAuNjkxLDAuMiwxNy4wNDIsMTcuNjI2LDI0LjczOWwwLjk2NywwLjQ0MmwtMC4xLDEuMDU5Yy0wLjQyMSw0LjM5LDEuMTQ1LDEwLjE5MSwxMC45OTMsMTIuODg4bDAuMTEzLDAuMDM4ICAgYzAuMDY3LDAuMDIzLDYuNzMyLDIuNDI5LDEwLjkwNywyLjQyOWMxLjU4NCwwLDIuMTU1LTAuMzUyLDIuMjQzLTAuNTYxYzAuMDg1LTAuMjAyLDAuNjEyLTIuMTY0LTYuMzMyLTkuMzg3bDAuMDAyLTAuMTgzICAgYzAsMC0yLjQ3Ny0zLjA3LDEuNTMzLTMuMDdjMC4wMSwwLDAuMDE5LDAsMC4wMjksMGMxLjI4NSwwLDIuNjA4LDAuMjE1LDMuOTgsMC4xODRjNC43NzEtMC4xMTcsOS4zMTYtMC40MjUsMTMuNTA2LTEuMDk2ICAgbDAuNDc0LTAuMDI4bDAuNjY4LDAuMTU4YzkuNjUxLDQuOTQ4LDE2LjczOCw3LjcxNiwxOS43MzgsNy43MTZ2MC4wMDZjMCwwLDAuMTY0LDAuMDExLDAuMjMsMC4wMDQgICBjLTAuMTg5LTAuNzIzLTIuMjMtMi44LTcuMjMtOS4wNzl2MC4wMjFjMCwwLTEuNTEyLTEuNjU4LDAuNzk3LTIuNjUzYzAuMDYzLTAuMDI2LDAuMDA4LDAuMDIzLDAuMDYtMC4wMDEgICBjOC42MzktMy41MDksMTMuNTAxLTguMjA0LDE1LjQxMS0xMS43NzVjMS4xNDUtMi4xMjksMC4yMDYtMi43ODQtMC42NTktMi45NzZjLTAuMzE3LTAuMDM4LTAuNjM0LTAuMDYyLTAuOTEyLTAuMDYyICAgYy0wLjIwNSwwLTAuMzc5LDAuMDEtMC41MjgsMC4wMjdsLTMuMTQzLDEuMjE0QzgzLjczMiw1My45MjYsNzMuMjE4LDU1LjUsNjEuMjIsNTUuNWMtMC4wMDIsMC0wLjAwNSwwLTAuMDA1LDAgICBjLTE1LjEyOCwwLTI5LjEwMS0yLjQzMi0zNi4wODMtMy43NzFsLTAuMTczLTAuMTExbC0wLjE2LTAuMTI2Yy01Ljg1OC0yLjY4MS01LjEzNy0xMC4yMDItNS4xMDMtMTAuNTE5bDAuMDYtMC4zICAgYzAuODk1LTIuODM4LDIuNDY3LTYuMzUyLDUuMjEzLTkuNzE5Yy0xLjgwOC0xLjM2OS00LjU5LTQuMTg4LTQuNDMtOC40OTRjMC4wNDYtMS4yNDQtMC40ODYtMi41MDgtMS40OTgtMy41NTkgICBjLTEuNDk4LTEuNTU1LTMuNzg1LTIuNDQ2LTYuMjc0LTIuNDQ2Yy0xLjc3LDAtMy41NTMsMC40NDItNS4yOTMsMS4zMTRjLTQuMDYxLDIuMDM1LTQuODU1LDQuNzM2LTUuNjkyLDcuNTk2ICAgYy0wLjEzNiwwLjQ2OC0wLjI4NCwwLjkzOS0wLjQzOCwxLjQxYy0wLjAwNiwwLjAxOS0wLjAyMiwwLjAzNS0wLjAyOCwwLjA1NkMwLjgzMywyOC40MjMsMS42OTEsMjguMzksMi4wOCwyOC4zMDh6IE0xMC40OTMsMTkuOTA4ICAgYzEuOTU2LDAsMy41NDgsMS41OTEsMy41NDgsMy41NDdjMCwxLjk1Ny0xLjU5MiwzLjU0OC0zLjU0OCwzLjU0OGMtMS45NTcsMC0zLjU0OC0xLjU5Mi0zLjU0OC0zLjU0OCAgIEM2Ljk0NCwyMS40OTksOC41MzYsMTkuOTA4LDEwLjQ5MywxOS45MDh6Ij48L3BhdGg+PC9nPjwvc3ZnPg==';

function ListItem(props) {
  return (
    <View style={styles.row}>
      <View style={styles.column1}>
        <Image source={props.imageSource} style={styles.icon} />
      </View>
      <View style={styles.column2}>
        <View style={styles.textBox}>
          <Text>Text Text Text</Text>
        </View>
      </View>
      <View style={styles.column3}>
        <Button onPress={() => {}} style={styles.smallButton} title="Button" />
      </View>
    </View>
  );
}

function TextAlignmentExample(props) {
  return (
    <Block description={props.description} title={props.title}>
      <View>
        <Text style={props.style}>Left-to-Right language text alignment.</Text>
        <Text style={props.style}>
          {'\u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 ' +
            '\u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631 ' +
            '\u0627\u0644\u0644\u063A\u0629 \u062F\u0648\u0646 ' +
            '\u0645\u062D\u0627\u0630\u0627\u0629 \u0627\u0644\u0646\u0635'}
        </Text>
        <Text style={props.style}>
          {'\u05DE\u05D9\u05DE\u05D9\u05DF \u05DC\u05E9\u05DE\u05D0\u05DC ' +
            '\u05D4\u05E9\u05E4\u05D4 \u05D1\u05DC\u05D9 ' +
            '\u05D9\u05D9\u05E9\u05D5\u05E8 \u05D8\u05E7\u05E1\u05D8'}
        </Text>
      </View>
    </Block>
  );
}

function withRTLState(Component) {
  return class extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        isRTL: false
      };
    }

    render() {
      const isRTL = this.state.isRTL;
      const setRTL = (isRTL) => this.setState({ isRTL: isRTL });
      return <Component isRTL={isRTL} setRTL={setRTL} />;
    }
  };
}

const RTLToggler = ({ isRTL, setRTL }) => {
  const toggleRTL = () => setRTL(!isRTL);
  return (
    <Button
      accessibilityLabel="Change layout direction"
      color="gray"
      onPress={toggleRTL}
      title={isRTL ? 'RTL' : 'LTR'}
    />
  );
};

const PaddingExample = withRTLState(({ isRTL, setRTL }) => {
  const color = 'teal';

  return (
    <Block title={'padding{Start,End}'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>paddingStart: 50,</Text>
      <Text>paddingEnd: 10</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <Text>The {color} is padding.</Text>
      <View
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: color,
          paddingStart: 50,
          paddingEnd: 10,
          borderWidth: 1,
          borderColor: color
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'gray'
          }}
        >
          <RTLToggler isRTL={isRTL} setRTL={setRTL} />
        </View>
      </View>
    </Block>
  );
});

const MarginExample = withRTLState(({ isRTL, setRTL }) => {
  return (
    <Block title={'margin{Start,End}'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>marginStart: 50,</Text>
      <Text>marginEnd: 10</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <Text>The green is margin.</Text>
      <View
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: 'green',
          borderWidth: 1,
          borderColor: 'green'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            marginStart: 50,
            marginEnd: 10,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'gray'
          }}
        >
          <RTLToggler isRTL={isRTL} setRTL={setRTL} />
        </View>
      </View>
    </Block>
  );
});

const PositionExample = withRTLState(({ isRTL, setRTL }) => {
  return (
    <Block title={'position: "start" | "end"'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>start: 50</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <Text>The orange is position.</Text>
      <View
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: 'orange',
          borderWidth: 1,
          borderColor: 'orange'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            start: 50,
            borderColor: 'gray'
          }}
        >
          <RTLToggler isRTL={isRTL} setRTL={setRTL} />
        </View>
      </View>
      <Text />
      <Text style={styles.bold}>Styles</Text>
      <Text>end: 50</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <Text>The orange is position.</Text>
      <View
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: 'orange',
          borderWidth: 1,
          borderColor: 'orange'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            end: 50,
            borderColor: 'gray'
          }}
        >
          <RTLToggler isRTL={isRTL} setRTL={setRTL} />
        </View>
      </View>
    </Block>
  );
});

const BorderWidthExample = withRTLState(({ isRTL, setRTL }) => {
  return (
    <Block title={'border{Start,End}Width'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>borderStartWidth: 10,</Text>
      <Text>borderEndWidth: 50</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <View dir={isRTL ? 'rtl' : 'ltr'}>
        <View
          style={{
            borderStartWidth: 10,
            borderEndWidth: 50
          }}
        >
          <View>
            <RTLToggler isRTL={isRTL} setRTL={setRTL} />
          </View>
        </View>
      </View>
    </Block>
  );
});

const BorderColorExample = withRTLState(({ isRTL, setRTL }) => {
  return (
    <Block title={'border{Start,End}Color'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>borderStartColor: 'red',</Text>
      <Text>borderEndColor: 'green',</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <View dir={isRTL ? 'rtl' : 'ltr'}>
        <View
          style={{
            borderStartColor: 'red',
            borderEndColor: 'green',
            borderLeftWidth: 20,
            borderRightWidth: 20,
            padding: 10
          }}
        >
          <View>
            <RTLToggler isRTL={isRTL} setRTL={setRTL} />
          </View>
        </View>
      </View>
    </Block>
  );
});

const BorderRadiiExample = withRTLState(({ isRTL, setRTL }) => {
  return (
    <Block title={'border{Top,Bottom}{Start,End}Radius'}>
      <Text style={styles.bold}>Styles</Text>
      <Text>borderTopStartRadius: 10,</Text>
      <Text>borderTopEndRadius: 20,</Text>
      <Text>borderBottomStartRadius: 30,</Text>
      <Text>borderBottomEndRadius: 40</Text>
      <Text />
      <Text style={styles.bold}>Demo: </Text>
      <View dir={isRTL ? 'rtl' : 'ltr'}>
        <View
          style={{
            borderWidth: 10,
            borderTopStartRadius: 10,
            borderTopEndRadius: 20,
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 40,
            padding: 10
          }}
        >
          <View>
            <RTLToggler isRTL={isRTL} setRTL={setRTL} />
          </View>
        </View>
      </View>
    </Block>
  );
});

function Block(props) {
  let description;
  if (props.description) {
    description = <Text style={blockStyles.descriptionText}>{props.description}</Text>;
  }

  return (
    <View style={blockStyles.container}>
      <View style={blockStyles.titleContainer}>
        <Text style={blockStyles.titleText}>{props.title}</Text>
        {description}
      </View>
      <View style={blockStyles.children}>{props.children}</View>
    </View>
  );
}

const blockStyles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden'
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  descriptionText: {
    fontSize: 14
  },
  disclosure: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10
  },
  disclosureIcon: {
    width: 12,
    height: 8
  },
  children: {
    margin: 10
  }
});

class LayoutRTLExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleStatus: {},
      isRTL: false,
      containerWidth: 0
    };

    this._onDirectionChange = this._onDirectionChange.bind(this);
  }

  render() {
    return (
      <ScrollView dir={this.state.isRTL ? 'rtl' : 'ltr'} style={[styles.container]}>
        <Block title={'Current layout direction'}>
          <View dir="ltr" style={styles.directionBox}>
            <Text style={styles.directionText}>
              {this.state.isRTL ? 'Right-to-Left' : 'Left-to-Right'}
            </Text>
            <Switch onValueChange={this._onDirectionChange} value={this.state.isRTL} />
          </View>
        </Block>

        <TextAlignmentExample
          description={'Depends on the text content.'}
          style={styles.fontSizeSmall}
          title={'Default text alignment'}
        />
        <TextAlignmentExample
          style={[styles.fontSizeSmall, styles.textAlignLeft]}
          title={'textAlign: "left"'}
        />
        <TextAlignmentExample
          style={[styles.fontSizeSmall, styles.textAlignRight]}
          title={'textAlign: "right"'}
        />
        <TextAlignmentExample
          style={[styles.fontSizeSmall, styles.textAlignStart]}
          title={'textAlign: "start"'}
        />
        <TextAlignmentExample
          style={[styles.fontSizeSmall, styles.textAlignEnd]}
          title={'textAlign: "end"'}
        />
        <PaddingExample />
        <MarginExample />
        <PositionExample />
        <BorderColorExample />
        <BorderWidthExample />
        <BorderRadiiExample />

        <Block title={'A simple list-item layout'}>
          <View style={styles.list}>
            <ListItem imageSource={{ uri: 'https://picsum.photos/130/130?image=222' }} />
            <ListItem imageSource={{ uri: 'https://picsum.photos/130/130?image=250' }} />
          </View>
        </Block>

        <Block title={'Working with icons'}>
          <View style={[styles.flexDirectionRow, { justifyContent: 'space-around' }]}>
            <View style={{ alignItems: 'center' }}>
              <Image source={iconSource} style={styles.image} />
              <Text style={styles.fontSizeSmall}>No RTL flip</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={iconSource}
                style={[styles.image, { transform: [{ scaleX: this.state.isRTL ? -1 : 1 }] }]}
              />
              <Text style={styles.fontSizeSmall}>RTL flip</Text>
            </View>
          </View>
        </Block>
      </ScrollView>
    );
  }

  _onDirectionChange() {
    this.setState({ isRTL: !this.state.isRTL });
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  directionBox: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderWidth: 0.5,
    borderColor: 'black'
  },
  directionText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  switchRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  list: {
    height: 120,
    marginBottom: 5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#e5e5e5'
  },
  row: {
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#e5e5e5'
  },
  column1: {
    width: 60,
    padding: 6
  },
  column2: {
    flex: 1,
    padding: 6
  },
  column3: {
    justifyContent: 'center',
    padding: 6
  },
  icon: {
    width: 48,
    height: 48,
    borderWidth: 0.5,
    borderColor: '#e5e5e5'
  },
  image: {
    width: 48,
    height: 48
  },
  img: {
    width: IMAGE_SIZE[0] / SCALE,
    height: IMAGE_SIZE[1] / SCALE
  },
  view: {
    flex: 1
  },
  block: {
    padding: 10,
    alignItems: 'center'
  },
  smallButton: {
    height: 24,
    width: 64
  },
  fontSizeSmall: {
    fontSize: 14
  },
  fontSizeExtraSmall: {
    fontSize: 12
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textAlignStart: {
    textAlign: 'start'
  },
  textAlignEnd: {
    textAlign: 'end'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  bold: {
    fontWeight: 'bold'
  },
  rtlToggler: {
    color: 'gray',
    padding: 8,
    textAlign: 'center',
    fontWeight: '500'
  }
});

export default function LocalizationPage() {
  return (
    <Example title="Localized layout">
      <LayoutRTLExample />
    </Example>
  );
}
