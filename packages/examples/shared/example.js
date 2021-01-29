import { StyleSheet, Text, View } from 'react-native';

export default function Example(props) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text accessibilityLabel="Back" href="/" style={styles.back}>
          <svg
            style={{ fill: '#555', height: '100%' }}
            viewBox="0 0 140 140"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M105.614 118.681c3.398 3.396 3.4 8.912 0 12.311-3.396 3.399-8.91 3.398-12.311 0-.02-.02-.035-.04-.053-.061l-.025.022-57.66-57.66.024-.022a8.664 8.664 0 01-2.608-6.208 8.672 8.672 0 013.229-6.762l-.06-.058 57.66-57.66.025.024c.018-.021.033-.039.053-.058A8.706 8.706 0 01106.2 14.86c-.021.02-.041.034-.061.054l.023.024-52.119 52.125 51.54 51.54-.025.021c.015.022.036.036.056.057" />
          </svg>
        </Text>
        <Text accessibilityRole="heading" style={styles.title}>
          {props.title}
        </Text>
      </View>
      <View style={styles.container}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100vh',
  },
  header: {
    paddingVertical: '1em',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  back: {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    padding: 10,
    left: 0,
    top: 0,
    width: 40,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    overflowY: 'scroll'
  }
});
