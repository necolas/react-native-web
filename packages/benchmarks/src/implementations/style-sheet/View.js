/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, StyleResolver } from 'style-sheet';

class View extends React.Component {
  render() {
    const { style, ...other } = this.props;
    return <div {...other} className={StyleResolver.resolve([viewStyle.root, ...style])} />;
  }
}

const viewStyle = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: 'relative',
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  }
});

export default View;
