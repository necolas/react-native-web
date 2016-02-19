import React, { StyleSheet, Text } from '../../src'

const sizeStyles = StyleSheet.create({
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
})

const styles = StyleSheet.create({
  root: {
    fontFamily: '"Helvetica Neue", arial, sans-serif'
  }
})

const Heading = ({ children, size = 'normal' }) => (
  <Text
    accessibilityRole='heading'
    children={children}
    style={{ ...styles.root, ...sizeStyles[size] }}
  />
)

export default Heading
