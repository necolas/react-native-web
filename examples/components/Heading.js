import React, { StyleSheet, Text } from '../../src'

const styles = StyleSheet.create({
  root: {
    fontFamily: '"Helvetica Neue", arial, sans-serif'
  },
  size: {
    xlarge: {
      fontSize: '2rem',
      marginBottom: '1em'
    },
    large: {
      fontSize: '1.5rem',
      marginBottom: '1em',
      marginTop: '1em'
    },
    normal: {
      fontSize: '1.25rem',
      marginBottom: '0.5em',
      marginTop: '0.5em'
    }
  }
})

const Heading = ({ children, size = 'normal' }) => (
  <Text
    accessibilityRole='heading'
    children={children}
    style={[styles.root, styles.size[size]]}
  />
)

export default Heading
