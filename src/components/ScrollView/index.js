import React, { PropTypes } from 'react'
import { pickProps } from '../../modules/filterObjectProps'
import StyleSheet from '../../modules/StyleSheet'
import View from '../View'
import ScrollViewStylePropTypes from './ScrollViewStylePropTypes'

const scrollViewStyleKeys = Object.keys(ScrollViewStylePropTypes)

const styles = StyleSheet.create({
  initial: {
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'scroll'
  },
  scrollDisabled: {
    overflow: 'hidden'
  },
  contentContainerStyleInitial: {
    flexShrink: 1,
    flexGrow: 1
  },
  contentContainerStyleHorizontal: {
    flexDirection: 'row'
  }
})

class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    contentContainerStyle: PropTypes.shape(ScrollViewStylePropTypes),
    horizontal: PropTypes.bool,
    onScroll: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    style: PropTypes.shape(ScrollViewStylePropTypes)
  }

  static defaultProps = {
    className: '',
    style: styles.initial,
    horizontal: false,
    scrollEnabled: true
  }

  _onScroll(e) {
    const { onScroll } = this.props
    if (onScroll) onScroll(e)
  }

  render() {
    const {
      children,
      contentContainerStyle,
      horizontal,
      scrollEnabled,
      style
    } = this.props

    const resolvedStyle = pickProps(style, scrollViewStyleKeys)
    const resolvedContentContainerStyle = pickProps(contentContainerStyle, scrollViewStyleKeys)

    return (
      <View
        _className='ScrollView'
        onScroll={e => this._onScroll(e)}
        style={{
          ...styles.initial,
          ...(!scrollEnabled && styles.scrollDisabled),
          ...resolvedStyle
        }}
      >
        {children ? (
          <View
            _className='ScrollViewContentContainer'
            children={children}
            style={{
              ...styles.contentContainerStyleInitial,
              ...resolvedContentContainerStyle,
              ...(horizontal && styles.contentContainerStyleHorizontal)
            }}
          />
        ) : null}
      </View>
    )
  }
}

export default ScrollView
