/* eslint-disable react/prop-types */

/**
 * @flow
 */

import AppText from './AppText';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DocItem = ({ description, example = {}, name, typeInfo, label }) =>
  <View style={styles.example}>
    {name &&
      <AppText style={styles.title}>
        <PropText label={label} name={name} typeInfo={typeInfo} />
      </AppText>}
    {description && <AppText style={styles.description}>{description}</AppText>}
    {(example.render || example.code) &&
      <View style={styles.renderBox}>
        <AppText style={styles.exampleText}>Example</AppText>
        {example.render && <View>{example.render()}</View>}
        {example.render && example.code && <View style={styles.verticalDivider} />}
        {example.code && <Text style={styles.code}>{example.code}</Text>}
      </View>}
  </View>;

const PropText = ({ label, name, typeInfo }) =>
  <AppText>
    {label &&
      <Text style={[styles.label, label === 'web' && styles.webLabel]}>
        {label}
      </Text>}
    <Text style={styles.propName}>{name}</Text>
    {typeInfo && <Text>{': '}<Text style={styles.code}>{typeInfo}</Text></Text>}
  </AppText>;

const styles = StyleSheet.create({
  code: {
    fontFamily: 'monospace, monospace',
    lineHeight: '1.3125em'
  },
  example: {
    marginBottom: 'calc(1.5 * 1.3125rem)'
  },
  title: {
    fontSize: '1rem'
  },
  label: {
    backgroundColor: '#ddd',
    color: '#555',
    borderRadius: '1rem',
    paddingVertical: '0.125rem',
    paddingHorizontal: '0.5rem',
    marginRight: '0.5rem'
  },
  propName: {
    fontWeight: 'bold'
  },
  webLabel: {
    backgroundColor: '#bdebff',
    color: '#025268'
  },
  description: {
    fontSize: '1rem',
    marginTop: 'calc(0.5 * 1.3125rem)'
  },
  renderBox: {
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
  },
  verticalDivider: {
    height: '1rem'
  }
});

export default DocItem;
