import React, { StyleSheet, Text, View } from '../../src'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    textAlign: 'center'
  },
  heading: {
    fontWeight: 'bold',
    padding: 5
  }
})

const MediaQueryWidget = ({ mediaQuery = {} }) => {
  const active = Object.keys(mediaQuery).reduce((active, alias) => {
    if (mediaQuery[alias].matches) {
      active = {
        alias,
        mql: mediaQuery[alias]
      }
    }
    return active
  }, {})

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Active Media Query</Text>
      <Text>{`"${active.alias}"`} {active.mql && active.mql.media}</Text>
    </View>
  )
}

export default MediaQueryWidget
