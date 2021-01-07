/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */
'use strict';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Circle(props) {
  const size = props.size || 20;
  const backgroundColor = props.bgColor || '#527fe4';
  return (
    <View
      style={{
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        width: size,
        height: size,
        margin: 1,
      }}
    />
  );
}

function CircleBlock(props) {
  return <View style={[styles.circleBlock, props.style]}>{props.children}</View>;
}

function Section(props) {
  return (
    <View>
      <Text style={styles.heading}>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
}

function Spacer() {
  return <View style={styles.spacer} />;
}

export default function StyleFlexbox() {
  const fiveColoredCircles = [
    <Circle bgColor="#527fe4" key="blue" />,
    <Circle bgColor="#D443E3" key="violet" />,
    <Circle bgColor="#FF9049" key="orange" />,
    <Circle bgColor="#FFE649" key="yellow" />,
    <Circle bgColor="#7FE040" key="green" />,
  ];

  return (
    <View>
      <Section title="flexDirection">
        <Text>column</Text>
        <CircleBlock style={{ flexDirection: 'column' }}>{fiveColoredCircles}</CircleBlock>
        <Text>column-reverse</Text>
        <CircleBlock style={{ flexDirection: 'column-reverse' }}>{fiveColoredCircles}</CircleBlock>
        <Text>row</Text>
        <CircleBlock style={{ flexDirection: 'row' }}>{fiveColoredCircles}</CircleBlock>
        <Text>row-reverse</Text>
        <CircleBlock style={{ flexDirection: 'row-reverse' }}>{fiveColoredCircles}</CircleBlock>
      </Section>

      <Spacer />

      <Section title="alignItems (row)">
        <Text>flex-start</Text>
        <CircleBlock style={{ alignItems: 'flex-start', height: 30 }}>
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={8} />
        </CircleBlock>
        <Text>center</Text>
        <CircleBlock style={{ alignItems: 'center', height: 30 }}>
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={8} />
        </CircleBlock>
        <Text>flex-end</Text>
        <CircleBlock style={{ alignItems: 'flex-end', height: 30 }}>
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={10} />
          <Circle size={20} />
          <Circle size={17} />
          <Circle size={12} />
          <Circle size={15} />
          <Circle size={8} />
        </CircleBlock>
      </Section>

      <Spacer />

      <Section title="flexWrap (row)">
        <CircleBlock style={{ flexWrap: 'wrap' }}>
          {'ooooooooooooooooooooooooooooooooooooo'.split('').map((char, i) => (
            <Circle key={i} />
          ))}
        </CircleBlock>
      </Section>

      <Spacer />

      <Section title="justifyContent (row)">
        <Text>flex-start</Text>
        <CircleBlock style={{ justifyContent: 'flex-start' }}>{fiveColoredCircles}</CircleBlock>
        <Text>center</Text>
        <CircleBlock style={{ justifyContent: 'center' }}>{fiveColoredCircles}</CircleBlock>
        <Text>flex-end</Text>
        <CircleBlock style={{ justifyContent: 'flex-end' }}>{fiveColoredCircles}</CircleBlock>
        <Text>space-between</Text>
        <CircleBlock style={{ justifyContent: 'space-between' }}>{fiveColoredCircles}</CircleBlock>
        <Text>space-around</Text>
        <CircleBlock style={{ justifyContent: 'space-around' }}>{fiveColoredCircles}</CircleBlock>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  circleBlock: {
    flexDirection: 'row',
    backgroundColor: '#f6f7f8',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 2,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  spacer: {
    height: '1.5rem',
  },
});
