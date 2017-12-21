/* eslint-env jasmine, jest */
/* eslint-disable react/prop-types */

import { mount, render, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, Text, View } from '../../src';
import toJson from 'enzyme-to-json';

/**
 * Fixtures
 */

const Box = ({ children, element, style, ...rest }) => (
  <View {...rest} style={[styles.box, style]}>
    {children}
    {element}
  </View>
);

const Title = ({ style, ...rest }) => <Text {...rest} style={[styles.title, style]} />;

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'red',
    padding: 10
  },
  boxExtra: {
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  element: {
    padding: 20
  }
});

/**
 * Test cases
 */

const cases = {
  noop: <View />,
  composite: <Box />,
  nested: (
    <Box>
      <Title>Hello World</Title>
    </Box>
  ),
  complex: (
    <Box
      element={
        <View>
          <View style={styles.element} />
          <Text>Nested</Text>
        </View>
      }
    >
      <Title>Hello World</Title>
    </Box>
  )
};

const caseNames = Object.keys(cases);

describe('enzyme', () => {
  caseNames.forEach(caseName => {
    test(caseName, () => {
      const element = cases[caseName];
      const mountTree = mount(element);
      const renderTree = render(element);
      const shallowTree = shallow(element);

      expect(toJson(mountTree)).toMatchSnapshot(`enzyme.mount ${caseName}`);
      expect(toJson(renderTree)).toMatchSnapshot(`enzyme.render ${caseName}`);
      expect(toJson(shallowTree)).toMatchSnapshot(`enzyme.shallow ${caseName}`);
    });
  });
});

describe('react-test-renderer', () => {
  caseNames.forEach(caseName => {
    test(caseName, () => {
      const element = cases[caseName];
      const tree = renderer.create(element).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
