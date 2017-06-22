/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Examples explorer
 */
const AppText = ({ style, ...rest }) => <Text {...rest} style={[styles.baseText, style]} />;
const Link = ({ uri }) =>
  <AppText accessibilityRole="link" href={uri} style={styles.link} target="_blank">
    API documentation
  </AppText>;
const Title = ({ children }) => <AppText style={styles.title}>{children}</AppText>;
const Description = ({ children }) => <AppText style={styles.description}>{children}</AppText>;

const Example = ({ example: { description, render, title } }) =>
  <View style={styles.example}>
    <AppText style={styles.exampleTitle}>{title}</AppText>
    {description && <AppText style={styles.exampleDescription}>{description}</AppText>}
    {render &&
      <View style={styles.exampleRenderBox}>
        <AppText style={styles.exampleText}>Example</AppText>
        <View>{render()}</View>
      </View>}
  </View>;

const UIExplorer = ({ description, examples, title, url }) =>
  <View style={styles.root}>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
    {url && <Link uri={url} />}
    {examples.map((example, i) => <Example example={example} key={i} />)}
  </View>;

const styles = StyleSheet.create({
  root: {
    padding: '1rem',
    flex: 1
  },
  baseText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, ' +
        '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', // emoji fonts
    lineHeight: '1.3125em'
  },
  title: {
    fontSize: '2rem'
  },
  description: {
    color: '#657786',
    fontSize: '1.3125rem',
    marginTop: 'calc(0.5 * 1.3125rem)'
  },
  link: {
    color: '#1B95E0',
    marginTop: 'calc(0.5 * 1.3125rem)'
  },
  example: {
    marginTop: 'calc(2 * 1.3125rem)'
  },
  exampleTitle: {
    fontSize: '1.3125rem'
  },
  exampleDescription: {
    fontSize: '1rem',
    marginTop: 'calc(0.5 * 1.3125rem)'
  },
  exampleRenderBox: {
    borderColor: '#E6ECF0',
    borderWidth: 1,
    padding: '1.3125rem',
    marginTop: '1.3125rem'
  },
  exampleText: {
    color: '#AAB8C2',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: 'calc(0.5 * 1.3125rem)',
    textTransform: 'uppercase'
  }
});

export default UIExplorer;
