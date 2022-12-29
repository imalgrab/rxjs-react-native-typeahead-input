import { StyleSheet, Text, View } from 'react-native';
import { Typeahead } from './components/Typeahead';

export default function App() {
  return (
    <View style={styles.container}>
      <Typeahead />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
