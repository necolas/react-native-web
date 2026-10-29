import { StyleSheet, Text, Pressable } from 'react-native';

export default function Button(props) {
  const { title, ...rest } = props;
  return (
    <Pressable {...rest} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingBlock: 5,
    paddingInline: 10
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
