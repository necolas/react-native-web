/* eslint-disable react/prop-types */

/**
 * @flow
 */

import AppText from './AppText';
import insertBetween from './insertBetween';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Title = ({ children }) =>
  <AppText style={styles.title}>
    {children}
  </AppText>;

export const Description = ({ children }) =>
  <AppText style={styles.description}>
    {insertBetween(() => <Divider key={Math.random()} />, React.Children.toArray(children))}
  </AppText>;

const Divider = () => <View style={styles.divider} />;

const SourceLink = ({ uri }) =>
  <AppText
    accessibilityRole="link"
    href={`https://github.com/necolas/react-native-web/tree/master/docs/storybook/${uri}`}
    style={styles.link}
    target="_blank"
  >
    View source code on GitHub
  </AppText>;

const UIExplorer = ({ children, description, sections, title, url }) =>
  <View style={styles.root}>
    <Title>
      {title}
    </Title>
    {description}
    {children}
    {url && <SourceLink uri={url} />}
  </View>;

const styles = StyleSheet.create({
  root: {
    padding: '1rem',
    flex: 1
  },
  divider: {
    height: '1.3125rem'
  },
  title: {
    fontSize: '2rem'
  },
  description: {
    color: '#666',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.25rem',
    marginTop: 'calc(0.5 * 1.3125rem)',
    marginBottom: 'calc(1.5 * 1.3125rem)'
  },
  link: {
    color: '#1B95E0',
    marginTop: 'calc(0.5 * 1.3125rem)',
    textDecorationLine: 'underline'
  }
});

export default UIExplorer;
