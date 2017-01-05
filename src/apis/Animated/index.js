import Animated from 'animated';
import Image from '../../components/Image';
import ScrollView from '../../components/ScrollView';
import StyleSheet from '../StyleSheet';
import Text from '../../components/Text';
import View from '../../components/View';

Animated.inject.FlattenStyle(StyleSheet.flatten);

module.exports = {
  ...Animated,
  Image: Animated.createAnimatedComponent(Image),
  ScrollView: Animated.createAnimatedComponent(ScrollView),
  Text: Animated.createAnimatedComponent(Text),
  View: Animated.createAnimatedComponent(View)
};
