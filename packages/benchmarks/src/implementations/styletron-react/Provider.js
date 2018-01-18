/* eslint-disable react/prop-types */
import React from 'react';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';
import View from './View';

const styletron = new Styletron();

class Provider extends React.Component {
  render() {
    return (
      <StyletronProvider styletron={styletron}>
        <View>{this.props.children}</View>
      </StyletronProvider>
    );
  }
}

export default Provider;
