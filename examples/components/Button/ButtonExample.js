import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import { Button, StyleSheet, View } from 'react-native';

const onButtonPress = action('Button has been pressed!');

const examples = [
  {
    title: 'Simple Button',
    description: 'The title and onPress handler are required. It is ' +
      'recommended to set accessibilityLabel to help make your app usable by ' +
      'everyone.',
    render: function() {
      return (
        <Button
          onPress={onButtonPress}
          title="Press Me"
          accessibilityLabel="See an informative alert"
        />
      );
    },
  },
  {
    title: 'Adjusted color',
    description: 'Adjusts the color in a way that looks standard on each ' +
      'platform. On iOS, the color prop controls the color of the text. On ' +
      'Android, the color adjusts the background color of the button.',
    render: function() {
      return (
        <Button
          onPress={onButtonPress}
          title="Press Purple"
          color="#841584"
          accessibilityLabel="Learn more about purple"
        />
      );
    },
  },
  {
    title: 'Fit to text layout',
    description: 'This layout strategy lets the title define the width of ' +
      'the button',
    render: function() {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            onPress={onButtonPress}
            title="This looks great!"
            accessibilityLabel="This sounds great!"
          />
          <Button
            onPress={onButtonPress}
            title="Ok!"
            color="#841584"
            accessibilityLabel="Ok, Great!"
          />
        </View>
      );
    },
  },
  {
    title: 'Disabled Button',
    description: 'All interactions for the component are disabled.',
    render: function() {
      return (
        <Button
          disabled
          onPress={onButtonPress}
          title="I Am Disabled"
          accessibilityLabel="See an informative alert"
        />
      );
    },
  },
];

examples.forEach((example) => {
  storiesOf('component: Button', module)
    .add(example.title, () => example.render());
});
