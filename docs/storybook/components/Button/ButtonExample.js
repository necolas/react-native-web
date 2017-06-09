import React from 'react';
import UIExplorer from '../../UIExplorer';
import { action, storiesOf } from '@kadira/storybook';
import { Button, StyleSheet, View } from 'react-native';

const onButtonPress = action('Button has been pressed!');

const examples = [
  {
    title: 'Default',
    description:
      'The title and onPress handler are required. It is ' +
        'recommended to set "accessibilityLabel" to help make your app usable by ' +
        'everyone.',
    render() {
      return (
        <Button
          accessibilityLabel="See an informative alert"
          onPress={onButtonPress}
          title="Press me"
        />
      );
    }
  },
  {
    title: 'Custom colors',
    description:
      'Adjusts the color in a way that looks standard on each ' +
        'platform. On iOS, the color prop controls the color of the text. On ' +
        'Android, the color adjusts the background color of the button.',
    render() {
      return (
        <View>
          <Button color="#17BF63" onPress={onButtonPress} title="Press me" />
          <View style={styles.verticalDivider} />
          <Button color="#F45D22" onPress={onButtonPress} title="Press me" />
          <View style={styles.verticalDivider} />
          <Button color="#794BC4" onPress={onButtonPress} title="Press me" />
          <View style={styles.verticalDivider} />
          <Button color="#E0245E" onPress={onButtonPress} title="Press me" />
        </View>
      );
    }
  },
  {
    title: 'Disabled',
    description: 'All interactions for the component are disabled.',
    render() {
      return <Button disabled onPress={onButtonPress} title="Disabled button" />;
    }
  },
  {
    title: 'Fit to text layout',
    description: 'This layout strategy lets the title define the width of the button',
    render() {
      return (
        <View style={styles.horizontal}>
          <Button
            accessibilityLabel="This sounds great!"
            onPress={onButtonPress}
            title="This looks great!"
          />
          <View style={styles.horizontalDivider} />
          <Button
            accessibilityLabel="Ok, Great!"
            color="#841584"
            onPress={onButtonPress}
            title="Ok!"
          />
        </View>
      );
    }
  }
];

const styles = StyleSheet.create({
  horizontalDivider: {
    width: '0.6rem'
  },
  horizontal: {
    flexDirection: 'row'
  },
  verticalDivider: {
    height: '1.3125rem'
  }
});

storiesOf('Components', module).add('Button', () =>
  <UIExplorer
    description="A basic button component. Supports a minimal level of customization. You can build your own custom button using &quot;TouchableOpacity&quot; or &quot;TouchableNativeFeedback&quot;"
    examples={examples}
    title="Button"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/Button.md"
  />
);
