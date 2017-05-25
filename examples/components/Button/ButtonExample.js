import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import { Button, View } from 'react-native';

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
          accessibilityLabel="See an informative alert"
          onPress={onButtonPress}
          title="Press Me"
        />
      );
    }
  },
  {
    title: 'Adjusted color',
    description: 'Adjusts the color in a way that looks standard on each ' +
      'platform. On iOS, the color prop controls the color of the text. On ' +
      'Android, the color adjusts the background color of the button.',
    render: function() {
      return (
        <Button
          accessibilityLabel="Learn more about purple"
          color="#841584"
          onPress={onButtonPress}
          title="Press Purple"
        />
      );
    }
  },
  {
    title: 'Fit to text layout',
    description: 'This layout strategy lets the title define the width of the button',
    render: function() {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            accessibilityLabel="This sounds great!"
            onPress={onButtonPress}
            title="This looks great!"
          />
          <Button
            accessibilityLabel="Ok, Great!"
            color="#841584"
            onPress={onButtonPress}
            title="Ok!"
          />
        </View>
      );
    }
  },
  {
    title: 'Disabled Button',
    description: 'All interactions for the component are disabled.',
    render: function() {
      return (
        <Button
          accessibilityLabel="See an informative alert"
          disabled
          onPress={onButtonPress}
          title="I Am Disabled"
        />
      );
    }
  }
];

examples.forEach(example => {
  storiesOf('component: Button', module).add(example.title, () => example.render());
});
