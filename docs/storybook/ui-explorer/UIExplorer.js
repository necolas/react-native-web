/* eslint-disable react/prop-types */

/**
 * @flow
 */

import AppText from './AppText';
import insertBetween from './insertBetween';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Title = ({ children }) => <AppText style={styles.title}>{children}</AppText>;
const Description = ({ children }) => <AppText style={styles.description}>{children}</AppText>;
const SectionTitle = ({ children }) => <AppText style={styles.sectionTitle}>{children}</AppText>;

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

const UIExplorer = ({ description, sections, title, url }) =>
  <View style={styles.root}>
    <Title>{title}</Title>
    {description &&
      <Description>
        {Array.isArray(description) ? insertBetween(<Divider />, description) : description}
      </Description>}
    {sections.map(({ entries, title }, i) =>
      <View key={i}>
        <SectionTitle>{title}</SectionTitle>
        {entries}
      </View>
    )}
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
  sectionTitle: {
    fontSize: '1.3125rem',
    marginBottom: '1.3125rem',
    fontWeight: 'bold'
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
