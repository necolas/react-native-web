import AspectRatio from '../AspectRatio';
import { Image, StyleSheet } from 'react-native';
import React, { PropTypes, PureComponent } from 'react';
import theme from '../theme';

class UserAvatar extends PureComponent {
  static displayName = 'UserAvatar';

  static propTypes = {
    accessibilityLabel: PropTypes.string,
    circle: PropTypes.bool,
    style: PropTypes.object,
    uri: PropTypes.string
  };

  static defaultProps = {
    circle: false
  };

  render() {
    const { accessibilityLabel, circle, style, uri } = this.props;

    return (
      <AspectRatio ratio={1} style={[styles.root, style]}>
        {uri
          ? <Image
              accessibilityLabel={accessibilityLabel}
              onLoad={this._handleLoad}
              ref={this._setImageRef}
              source={{ uri }}
              style={[styles.image, circle && styles.circle]}
            />
          : null}
      </AspectRatio>
    );
  }

  _handleLoad = () => {
    this._imageRef && this._imageRef.setNativeProps(nativeProps);
  };

  _setImageRef = component => {
    this._imageRef = component;
  };
}

const nativeProps = { style: { backgroundColor: '#fff' } };

const styles = StyleSheet.create({
  root: {
    borderRadius: '0.35rem'
  },
  circle: {
    borderRadius: '9999px'
  },
  image: {
    backgroundColor: theme.colors.fadedGray,
    display: 'block',
    height: '100%',
    width: '100%'
  }
});

export default UserAvatar;
