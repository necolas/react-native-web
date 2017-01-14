import Animated from 'animated';
import Image from '../../components/Image';
import StyleSheet from '../../apis/StyleSheet';
import Text from '../../components/Text';
import View from '../../components/View';

Animated.inject.FlattenStyle(StyleSheet.flatten);

module.exports = {
  ...Animated,
  Image: Animated.createAnimatedComponent(Image),
  Text: Animated.createAnimatedComponent(Text),
  View: Animated.createAnimatedComponent(View)
};
